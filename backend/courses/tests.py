from django.test import TestCase
from django.contrib.auth.models import User
from .models import Course, Enrollment, Payment, Prerequisite
from rest_framework.test import APIClient
from rest_framework import status
from datetime import date
from decimal import Decimal

# Create your tests here.

class CourseModelTest(TestCase):
    def test_course_creation(self):
        course = Course.objects.create(
            title="Introduction to Programming",
            code="CS101",
            description="Basic programming concepts.",
            instructor="Dr. Smith",
            capacity=50,
            start_date=date(2024, 9, 1),
            end_date=date(2024, 12, 15),
            schedule="Tue, Thu 10:00-11:30 AM",
            price=Decimal('199.99')
        )
        self.assertEqual(course.title, "Introduction to Programming")
        self.assertEqual(course.code, "CS101")
        self.assertEqual(course.available_slots, 50) # No enrollments yet

class UserAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_superuser(username='admin', email='admin@example.com', password='adminpassword')
        self.regular_user = User.objects.create_user(username='testuser', email='test@example.com', password='testpassword')

    def test_create_user_registration(self):
        # Anyone can register a user
        data = {'username': 'newuser', 'email': 'new@example.com', 'password': 'newpassword123'}
        response = self.client.post('/api/users/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='newuser').exists())

    def test_list_users_as_admin(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data['results']), 2) # admin and testuser

    def test_list_users_as_regular_user(self):
        self.client.force_authenticate(user=self.regular_user)
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN) # Only admins can list users
