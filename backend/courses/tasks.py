from celery import shared_task
import boto3
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from .models import Enrollment
import logging

logger = logging.getLogger(__name__)

@shared_task
def send_enrollment_confirmation_email(enrollment_id):
    """
    Sends an enrollment confirmation email using AWS SES.
    """
    try:
        enrollment = Enrollment.objects.select_related('student', 'course').get(id=enrollment_id)
        student_email = enrollment.student.email
        course_title = enrollment.course.title
        course_code = enrollment.course.code
        student_name = enrollment.student.get_full_name() or enrollment.student.username

        subject = f"Enrollment Confirmation: {course_code} - {course_title}"
        
        # Render HTML content for the email
        html_message = render_to_string('emails/enrollment_confirmation.html', {
            'student_name': student_name,
            'course_title': course_title,
            'course_code': course_code,
            'enrollment_date': enrollment.enrollment_date.strftime("%Y-%m-%d %H:%M UTC"),
        })
        plain_message = strip_tags(html_message) # Fallback for plain text clients

        ses_client = boto3.client(
            'ses',
            region_name=settings.AWS_REGION_NAME,
            # AWS credentials will be picked up from environment variables or IAM roles
            # aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            # aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        )

        response = ses_client.send_email(
            Source=settings.DEFAULT_FROM_EMAIL,
            Destination={
                'ToAddresses': [student_email],
            },
            Message={
                'Subject': {
                    'Data': subject,
                    'Charset': 'UTF-8',
                },
                'Body': {
                    'Html': {
                        'Data': html_message,
                        'Charset': 'UTF-8',
                    },
                    'Text': {
                        'Data': plain_message,
                        'Charset': 'UTF-8',
                    },
                },
            },
        )
        logger.info(f"Enrollment confirmation email sent to {student_email} for enrollment {enrollment_id}. Message ID: {response['MessageId']}")
        return True
    except Enrollment.DoesNotExist:
        logger.error(f"Enrollment with ID {enrollment_id} not found for email confirmation.")
        return False
    except Exception as e:
        logger.error(f"Failed to send enrollment confirmation email for enrollment {enrollment_id}: {e}")
        return False

# Placeholder for other tasks like report generation
@shared_task
def generate_enrollment_report_task():
    logger.info("Generating enrollment report...")
    # Add logic to query database, process data, and generate report
    # This could involve writing to S3, sending to an admin email, etc.
    logger.info("Enrollment report generation complete.")
