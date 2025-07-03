# Database Setup and Management for Online Course Registration System

This directory contains all the SQL scripts and configurations for the PostgreSQL database of the Online Course Registration System.

## Database Technology
*   **PostgreSQL 15+**

## Structure
The `database/` folder is organized as follows:
*   `schema/`: Contains SQL scripts for creating tables, defining constraints, and setting up the initial database schema.
*   `migrations/`: (Placeholder) Future scripts for database migrations (e.g., Flyway, Alembic) will reside here.
*   `data/`: (Placeholder) Scripts for initial data seeding or lookup tables.
*   `scripts/`: (Placeholder) Utility scripts for database maintenance, backups, etc.

## Setup Instructions

### Prerequisites
*   PostgreSQL 15+ installed and running (or access to an AWS RDS PostgreSQL instance).
*   A database user with appropriate permissions (e.g., `db_admin`).
*   `psql` client or a similar SQL client for executing scripts.

### Steps to Set Up the Database

1.  **Create the Database:**
    Connect to your PostgreSQL server as a superuser or a user with `CREATEDB` privileges and create a new database for the system.
    ```sql
    CREATE DATABASE course_registration_db;
    ```

2.  **Connect to the Database:**
    Connect to the newly created database using your database user.
    ```bash
    psql -h <your_db_host> -p <your_db_port> -U <your_db_user> -d course_registration_db
    ```
    (Replace `<your_db_host>`, `<your_db_port>`, and `<your_db_user>` with your actual database credentials.)

3.  **Execute Schema Creation Scripts:**
    Navigate to the `database/schema/` directory and execute the SQL scripts in the specified order to create the tables and apply constraints.

    ```bash
    # From your terminal, assuming you are in the database/ directory
    psql -h <your_db_host> -p <your_db_port> -U <your_db_user> -d course_registration_db -f schema/001_create_users_table.sql
    psql -h <your_db_host> -p <your_db_port> -U <your_db_user> -d course_registration_db -f schema/002_create_courses_table.sql
    psql -h <your_db_host> -p <your_db_port> -U <your_db_user> -d course_registration_db -f schema/003_create_prerequisites_table.sql
    psql -h <your_db_host> -p <your_db_port> -U <your_db_user> -d course_registration_db -f schema/004_create_enrollments_table.sql
    psql -h <your_db_host> -p <your_db_port> -U <your_db_user> -d course_registration_db -f schema/005_create_payments_table.sql
    psql -h <your_db_host> -p <your_db_port> -U <your_db_user> -d course_registration_db -f schema/006_create_academic_history_table.sql
    psql -h <your_db_host> -p <your_db_port> -U <your_db_user> -d course_registration_db -f schema/007_create_indexes.sql
    ```
    **Important:** Execute these scripts sequentially to ensure dependencies (e.g., foreign keys) are met.

## Database Integration with Backend
The backend application (Django) uses its ORM to interact with this PostgreSQL database.
Ensure the `DATABASE` configuration in the Django `settings.py` (typically `course_registration_backend/settings.py`) is correctly pointing to this database instance, including host, port, database name, user, and password.

Example Django `settings.py` snippet for database configuration:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'course_registration_db',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'your_db_host',
        'PORT': 'your_db_port',
    }
}
```
(Replace placeholders with actual values, ideally managed via environment variables.)

## Backup and Recovery
Regular database backups should be configured. For AWS RDS, automated backups are enabled by default. For self-hosted PostgreSQL, use `pg_dump` for logical backups.

Example `pg_dump` command:
```bash
pg_dump -h <your_db_host> -p <your_db_port> -U <your_db_user> -d course_registration_db > course_registration_db_backup_$(date +%Y%m%d%H%M%S).sql
```

## Maintenance
*   Regularly monitor database performance and resource utilization.
*   Perform `VACUUM ANALYZE` periodically to optimize query performance and reclaim space.
*   Review and optimize slow queries as identified by monitoring tools.
