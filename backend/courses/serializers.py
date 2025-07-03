from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Course, Enrollment, Payment, Prerequisite

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'date_joined', 'last_login')
        read_only_fields = ('date_joined', 'last_login')

class CourseSerializer(serializers.ModelSerializer):
    available_slots = serializers.ReadOnlyField()
    prerequisites = serializers.PrimaryKeyRelatedField(
        many=True, 
        queryset=Course.objects.all(), 
        source='prerequisites_for', 
        required=False
    )

    class Meta:
        model = Course
        fields = (
            'id', 'title', 'code', 'description', 'instructor', 'capacity',
            'start_date', 'end_date', 'schedule', 'price', 'available_slots',
            'prerequisites', 'created_at', 'updated_at'
        )
        read_only_fields = ('created_at', 'updated_at')

    def to_representation(self, instance):
        # Override to display prerequisite course codes instead of UUIDs
        ret = super().to_representation(instance)
        prereq_ids = [p.required_course.id for p in instance.prerequisites_for.all()]
        # Fetch the actual Course objects for these IDs to get their codes
        prereq_courses = Course.objects.filter(id__in=prereq_ids)
        ret['prerequisites'] = [course.code for course in prereq_courses]
        return ret
    
    def create(self, validated_data):
        prerequisites_data = validated_data.pop('prerequisites_for', [])
        course = Course.objects.create(**validated_data)
        for prereq_course in prerequisites_data:
            Prerequisite.objects.create(course=course, required_course=prereq_course)
        return course

    def update(self, instance, validated_data):
        prerequisites_data = validated_data.pop('prerequisites_for', None)
        
        # Update main course fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update prerequisites
        if prerequisites_data is not None:
            instance.prerequisites_for.all().delete() # Clear existing
            for prereq_course in prerequisites_data:
                Prerequisite.objects.create(course=instance, required_course=prereq_course)
        
        return instance

class EnrollmentSerializer(serializers.ModelSerializer):
    student_username = serializers.ReadOnlyField(source='student.username')
    course_title = serializers.ReadOnlyField(source='course.title')
    course_code = serializers.ReadOnlyField(source='course.code')

    class Meta:
        model = Enrollment
        fields = (
            'id', 'student', 'student_username', 'course', 'course_title',
            'course_code', 'enrollment_date', 'status'
        )
        read_only_fields = ('enrollment_date', 'status') # Status is updated internally

class PaymentSerializer(serializers.ModelSerializer):
    enrollment_id = serializers.ReadOnlyField(source='enrollment.id')
    student_username = serializers.ReadOnlyField(source='enrollment.student.username')
    course_title = serializers.ReadOnlyField(source='enrollment.course.title')

    class Meta:
        model = Payment
        fields = (
            'id', 'enrollment', 'enrollment_id', 'student_username', 'course_title',
            'amount', 'payment_date', 'status', 'stripe_charge_id'
        )
        read_only_fields = ('payment_date', 'status', 'stripe_charge_id')
