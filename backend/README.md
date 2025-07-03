# Backend for Online Course Registration System

This folder contains the backend application for the Online Course Registration System, built with Django and Django REST Framework.

## Technologies Used

*   **Python**: 3.11+
*   **Django**: 4.2+
*   **Django REST Framework**: 3.14+
*   **PostgreSQL**: Database
*   **Redis**: Caching and Celery broker
*   **Celery**: Asynchronous task queue
*   **Stripe**: Payment processing
*   **AWS SES (via boto3)**: Email sending
*   **Docker**: Containerization

## Setup Instructions

### Prerequisites

*   Docker and Docker Compose (recommended for local development)
*   Python 3.11+
*   Poetry (optional, for dependency management) or pip

### 1. Clone the Repository

If you haven't already, clone the main repository:

```bash
git clone https://github.com/50101063/flowisetemp.git
cd flowisetemp
```

### 2. Navigate to the Backend Directory

```bash
cd backend
```

### 3. Environment Configuration

Create a `.env` file in the `backend/` directory by copying the example:

```bash
cp .env.example .env
```

Edit the `.env` file and fill in the required values. These are crucial for database connection, secret keys, and external service integrations.

```ini
# Django Secret Key - IMPORTANT: GENERATE A STRONG, UNIQUE KEY FOR PRODUCTION
SECRET_KEY='your_django_secret_key_here'
DEBUG=True # Set to False in production

# Database Configuration (PostgreSQL)
DB_NAME=course_registration_db
DB_USER=user
DB_PASSWORD=password
DB_HOST=localhost # Use 'db' if running with Docker Compose
DB_PORT=5432

# Redis Configuration (for Celery and Caching)
REDIS_HOST=localhost # Use 'redis' if running with Docker Compose
REDIS_PORT=6379
REDIS_DB=0

# Stripe API Keys
STRIPE_SECRET_KEY='sk_test_...'
STRIPE_WEBHOOK_SECRET='whsec_...' # Your Stripe webhook signing secret (optional for local testing)

# AWS SES Configuration (for sending emails)
# Ensure your AWS credentials are configured via environment variables, AWS CLI, or IAM roles
# AWS_ACCESS_KEY_ID='your_aws_access_key_id'
# AWS_SECRET_ACCESS_KEY='your_aws_secret_access_key'
AWS_REGION_NAME='your_aws_region' # e.g., us-east-1
DEFAULT_FROM_EMAIL='noreply@yourdomain.com' # Email address verified in SES
```

### 4. Running with Docker Compose (Recommended for Local Development)

Docker Compose simplifies running the Django application along with its dependencies (PostgreSQL, Redis).

Create a `docker-compose.yml` file in the `backend/` directory:

```yaml
version: '3.8'

services:
  db:
    image: postgres:15-alpine
    restart: always
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - pg_data:/var/lib/postgresql/data/
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER} -d ${DB_NAME}"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    restart: always
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5

  backend:
    build: .
    restart: always
    command: sh -c "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"
    volumes:
      - .:/app/backend
    ports:
      - "8000:8000"
    env_file:
      - ./.env
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy

  celery_worker:
    build: .
    restart: always
    command: celery -A course_registration_backend worker -l info
    volumes:
      - .:/app/backend
    env_file:
      - ./.env
    depends_on:
      backend:
        condition: service_started # or service_healthy if backend has a healthcheck
      redis:
        condition: service_healthy

  celery_beat:
    build: .
    restart: always
    command: celery -A course_registration_backend beat -l info --scheduler django_celery_beat.schedulers:DatabaseScheduler
    volumes:
      - .:/app/backend
    env_file:
      - ./.env
    depends_on:
      backend:
        condition: service_started
      redis:
        condition: service_healthy

volumes:
  pg_data:
```

Now, build and run the services:

```bash
docker-compose up --build -d
```

Check the logs:

```bash
docker-compose logs -f
```

The backend API will be accessible at `http://localhost:8000`.

### 5. Manual Setup (without Docker Compose)

#### 5.1. Install Python Dependencies

Make sure you have Python 3.11+ installed. It's recommended to use a virtual environment.

```bash
python3 -m venv venv
source venv/bin/activate # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
```

#### 5.2. Start PostgreSQL and Redis

Ensure you have a PostgreSQL database and Redis server running locally, and update your `.env` file with the correct connection details.

#### 5.3. Run Database Migrations

```bash
python manage.py migrate
```

#### 5.4. Create a Superuser (for Django Admin)

```bash
python manage.py createsuperuser
```

#### 5.5. Run the Django Development Server

```bash
python manage.py runserver 0.0.0.0:8000
```

#### 5.6. Run Celery Worker (in a separate terminal)

```bash
celery -A course_registration_backend worker -l info
```

#### 5.7. Run Celery Beat (if using scheduled tasks, in another terminal)

```bash
celery -A course_registration_backend beat -l info --scheduler django_celery_beat.schedulers:DatabaseScheduler
```

The backend API will be accessible at `http://localhost:8000`.

## API Endpoints (Initial)

*   `http://localhost:8000/api/courses/` - List and create courses
*   `http://localhost:8000/api/courses/<id>/` - Retrieve, update, delete a course
*   `http://localhost:8000/api/users/` - List and create users (for registration)
*   `http://localhost:8000/api/enrollments/` - List and create enrollments
*   `http://localhost:8000/api/payments/` - List and create payments (triggered internally by Stripe webhooks)
*   `http://localhost:8000/admin/` - Django Admin Panel

## Integration with Frontend

The frontend application (React) should be configured to make API requests to `http://localhost:8000` (or the deployed backend URL). Ensure CORS settings in `settings.py` allow requests from your frontend's origin.

## Deployment

For production deployment, it is highly recommended to use a robust WSGI server like Gunicorn/Uvicorn, configure a proper reverse proxy (Nginx), and deploy to a cloud environment (e.g., AWS EKS as per Solution Architect's design). Refer to the `Dockerfile` for a basic production command. Ensure `DEBUG=False` and `ALLOWED_HOSTS` are correctly configured in `settings.py`.
