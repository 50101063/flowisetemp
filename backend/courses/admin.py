from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import Course, Enrollment, Payment, Prerequisite

# Register your models here.

# Customize User Admin if needed, otherwise default is fine for now
# class CustomUserAdmin(BaseUserAdmin):
#     pass
# admin.site.unregister(User)
# admin.site.register(User, CustomUserAdmin)

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'code', 'instructor', 'capacity', 'start_date', 'end_date', 'price')
    search_fields = ('title', 'code', 'instructor')
    list_filter = ('instructor', 'start_date', 'end_date')

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'enrollment_date', 'status')
    list_filter = ('status', 'enrollment_date')
    search_fields = ('student__username', 'course__title', 'status')
    raw_id_fields = ('student', 'course') # Useful for many-to-one relationships

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('enrollment', 'amount', 'payment_date', 'status', 'stripe_charge_id')
    list_filter = ('status', 'payment_date')
    search_fields = ('enrollment__student__username', 'enrollment__course__title', 'stripe_charge_id')
    raw_id_fields = ('enrollment',)

@admin.register(Prerequisite)
class PrerequisiteAdmin(admin.ModelAdmin):
    list_display = ('course', 'required_course')
    search_fields = ('course__title', 'required_course__title')
    raw_id_fields = ('course', 'required_course')
    verbose_name_plural = "Prerequisites"
