from django.db import models
from django.contrib.auth.models import User # Django's built-in User model
import uuid

class Course(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    code = models.CharField(max_length=20, unique=True)
    description = models.TextField()
    instructor = models.CharField(max_length=100)
    capacity = models.PositiveIntegerField(default=0)
    start_date = models.DateField()
    end_date = models.DateField()
    schedule = models.CharField(max_length=255, help_text="e.g., Mon, Wed 10:00-11:30 AM")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.code}: {self.title}"

    @property
    def available_slots(self):
        return self.capacity - self.enrollments.filter(status='registered').count()

    class Meta:
        ordering = ['code']

class Prerequisite(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    course = models.ForeignKey(Course, related_name='prerequisites_for', on_delete=models.CASCADE)
    required_course = models.ForeignKey(Course, related_name='is_prerequisite_for', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('course', 'required_course')
        verbose_name_plural = "Prerequisites"

    def __str__(self):
        return f"{self.course.code} requires {self.required_course.code}"

class Enrollment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending Payment'),
        ('registered', 'Registered'),
        ('dropped', 'Dropped'),
        ('failed', 'Payment Failed'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey(User, related_name='enrollments', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, related_name='enrollments', on_delete=models.CASCADE)
    enrollment_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    class Meta:
        unique_together = ('student', 'course')
        ordering = ['-enrollment_date']

    def __str__(self):
        return f"{self.student.username} enrolled in {self.course.title} ({self.status})"

class Payment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refund'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    enrollment = models.OneToOneField(Enrollment, related_name='payment', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    stripe_charge_id = models.CharField(max_length=255, blank=True, null=True, unique=True)
    
    class Meta:
        ordering = ['-payment_date']

    def __str__(self):
        return f"Payment for {self.enrollment.course.title} by {self.enrollment.student.username} - {self.status}"
