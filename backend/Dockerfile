# Use an official Python runtime as a parent image
FROM python:3.11-slim-buster

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app/backend

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file into the container
COPY requirements.txt .

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Run collectstatic and migrate on build for simplicity in this setup,
# in production these might be separate steps or entrypoint scripts.
# For now, we'll keep it simple for initial deployment.
RUN python manage.py collectstatic --noinput

# Define the command to run the application
# CMD ["gunicorn", "--bind", "0.0.0.0:8000", "course_registration_backend.wsgi:application"]
# For development/initial setup, run with Django's runserver
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
