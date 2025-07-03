from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from django.contrib.auth.models import User
from django.db import transaction
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.core.cache import cache

from .models import Course, Enrollment, Payment, Prerequisite
from .serializers import UserSerializer, CourseSerializer, EnrollmentSerializer, PaymentSerializer
from .tasks import send_enrollment_confirmation_email

import stripe
import logging

logger = logging.getLogger(__name__)

stripe.api_key = settings.STRIPE_SECRET_KEY

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser] # Only admin can list/create/update users for now

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        Allow anyone to create an account (register).
        """
        if self.action == 'create': # For user registration
            return [] # No permission required for create (public registration)
        return [permission() for permission in self.permission_classes]

    def create(self, request, *args, **kwargs):
        # Allow user registration (FR1)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Hash password before saving
        user = User.objects.create_user(
            username=serializer.validated_data['username'],
            email=serializer.validated_data.get('email', ''),
            password=request.data['password'], # Password comes directly from request
            first_name=serializer.validated_data.get('first_name', ''),
            last_name=serializer.validated_data.get('last_name', '')
        )
        headers = self.get_success_headers(serializer.data)
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED, headers=headers)


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all().order_by('code')
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticatedOrReadOnly] # Allow read for all, write for authenticated
    
    def get_permissions(self):
        """
        Allow authenticated users to read, but only admins to create/update/delete.
        """
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return [permission() for permission in self.permission_classes]

    def retrieve(self, request, *args, **kwargs):
        # Try to get from cache first
        course_id = kwargs['pk']
        cache_key = f'course_{course_id}'
        course_data = cache.get(cache_key)

        if course_data:
            logger.info(f"Serving course {course_id} from cache.")
            return Response(course_data)
        
        # If not in cache, fetch from DB
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        course_data = serializer.data
        
        # Cache the data for future requests
        cache.set(cache_key, course_data, timeout=60 * 15) # Cache for 15 minutes
        logger.info(f"Serving course {course_id} from DB and caching.")
        return Response(course_data)

    def perform_create(self, serializer):
        # Clear cache for course list when a new course is created
        super().perform_create(serializer)
        cache.delete('course_list')

    def perform_update(self, serializer):
        # Clear cache for specific course and course list when updated
        super().perform_update(serializer)
        cache.delete(f'course_{serializer.instance.id}')
        cache.delete('course_list')

    def perform_destroy(self, instance):
        # Clear cache for specific course and course list when deleted
        super().perform_destroy(instance)
        cache.delete(f'course_{instance.id}')
        cache.delete('course_list')

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all().order_by('-enrollment_date')
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated] # Only authenticated users can manage enrollments

    def get_queryset(self):
        # Students can only see their own enrollments (FR7)
        if self.request.user.is_staff:
            return Enrollment.objects.all() # Admins can see all
        return Enrollment.objects.filter(student=self.request.user)

    def perform_create(self, serializer):
        course = serializer.validated_data['course']
        student = self.request.user

        # Check if student is already enrolled in this course
        if Enrollment.objects.filter(student=student, course=course).exists():
            raise serializers.ValidationError("You are already enrolled in this course.")

        # Check prerequisites (FR6)
        for prereq in course.prerequisites_for.all():
            if not Enrollment.objects.filter(student=student, course=prereq.required_course, status='registered').exists():
                raise serializers.ValidationError(
                    f"Prerequisite '{prereq.required_course.title}' not met."
                )

        # Check course capacity (FR6)
        if course.available_slots <= 0:
            raise serializers.ValidationError("Course is full. No available slots.")

        # Create enrollment with 'pending' status
        enrollment = serializer.save(student=student, status='pending')
        
        # Create Stripe Payment Intent
        try:
            amount_cents = int(course.price * 100)
            payment_intent = stripe.PaymentIntent.create(
                amount=amount_cents,
                currency='usd',
                payment_method_types=['card'],
                metadata={'enrollment_id': str(enrollment.id), 'student_id': str(student.id), 'course_id': str(course.id)},
                description=f"Enrollment for {course.title} by {student.username}",
            )
            
            # Create a pending Payment record
            Payment.objects.create(
                enrollment=enrollment,
                amount=course.price,
                status='pending',
                stripe_charge_id=payment_intent.id # Store Payment Intent ID here
            )
            
            # Return client secret to frontend to complete payment
            return Response({'client_secret': payment_intent.client_secret, 'enrollment_id': enrollment.id}, status=status.HTTP_201_CREATED)

        except stripe.error.StripeError as e:
            logger.error(f"Stripe error creating payment intent for enrollment {enrollment.id}: {e}")
            enrollment.status = 'failed'
            enrollment.save()
            raise serializers.ValidationError(f"Payment initiation failed: {e}")
        except Exception as e:
            logger.error(f"Unexpected error creating payment intent for enrollment {enrollment.id}: {e}")
            enrollment.status = 'failed'
            enrollment.save()
            raise serializers.ValidationError(f"An unexpected error occurred: {e}")

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def drop(self, request, pk=None):
        """Allow a student to drop a course."""
        enrollment = get_object_or_404(Enrollment, pk=pk)

        # Only the student who owns the enrollment or an admin can drop it
        if not (request.user == enrollment.student or request.user.is_staff):
            return Response(
                {"detail": "You do not have permission to perform this action."},
                status=status.HTTP_403_FORBIDDEN
            )

        # Implement logic for refund window if needed
        # For simplicity, just update status
        if enrollment.status == 'registered':
            enrollment.status = 'dropped'
            enrollment.save()
            # Optionally, trigger refund process via Stripe API
            return Response({"detail": "Course dropped successfully."}, status=status.HTTP_200_OK)
        
        return Response({"detail": "Course cannot be dropped from its current status."}, status=status.HTTP_400_BAD_REQUEST)


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all().order_by('-payment_date')
    serializer_class = PaymentSerializer
    permission_classes = [IsAdminUser] # Only admins can view payment records directly

    # This viewset is primarily for administrative viewing.
    # Actual payment processing and status updates will mostly happen via Stripe webhooks.

# @csrf_exempt # Use this decorator if this is a standalone function not part of a DRF ViewSet
# def stripe_webhook_view(request):
#     payload = request.body
#     sig_header = request.META['HTTP_STRIPE_SIGNATURE']
#     event = None

#     try:
#         event = stripe.Webhook.construct_event(
#             payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
#         )
#     except ValueError as e:
#         # Invalid payload
#         logger.error(f"Stripe webhook invalid payload: {e}")
#         return HttpResponse(status=400)
#     except stripe.error.SignatureVerificationError as e:
#         # Invalid signature
#         logger.error(f"Stripe webhook invalid signature: {e}")
#         return HttpResponse(status=400)

#     # Handle the event
#     if event['type'] == 'payment_intent.succeeded':
#         payment_intent = event['data']['object']
#         enrollment_id = payment_intent['metadata'].get('enrollment_id')
#         
#         if enrollment_id:
#             with transaction.atomic():
#                 enrollment = get_object_or_404(Enrollment, id=enrollment_id)
#                 payment_record = get_object_or_404(Payment, enrollment=enrollment, stripe_charge_id=payment_intent.id)
#                 
#                 enrollment.status = 'registered'
#                 enrollment.save()
#                 
#                 payment_record.status = 'completed'
#                 payment_record.save()

#                 # Send confirmation email asynchronously
#                 send_enrollment_confirmation_email.delay(enrollment.id)
#                 logger.info(f"Payment successful for enrollment {enrollment_id}. Enrollment status updated.")
#         else:
#             logger.warning(f"Payment intent {payment_intent.id} succeeded but no enrollment_id in metadata.")

#     elif event['type'] == 'payment_intent.payment_failed':
#         payment_intent = event['data']['object']
#         enrollment_id = payment_intent['metadata'].get('enrollment_id')
#         
#         if enrollment_id:
#             with transaction.atomic():
#                 enrollment = get_object_or_404(Enrollment, id=enrollment_id)
#                 payment_record = get_object_or_404(Payment, enrollment=enrollment, stripe_charge_id=payment_intent.id)
#                 
#                 enrollment.status = 'failed'
#                 enrollment.save()
#                 
#                 payment_record.status = 'failed'
#                 payment_record.save()
#                 logger.warning(f"Payment failed for enrollment {enrollment_id}. Enrollment status updated.")
#         else:
#             logger.warning(f"Payment intent {payment_intent.id} failed but no enrollment_id in metadata.")
    
#     # Return a 200 response to acknowledge receipt of the event
#     return HttpResponse(status=200)
