# Database Setup and Management for Product CRUD API

This `database/` folder contains essential scripts and documentation for setting up and managing the PostgreSQL database used by the Product CRUD API.

## 1. Database Technology Stack

*   **Database System:** PostgreSQL
*   **ORM/Migrations:** SQLAlchemy and Alembic (managed within the `backend/` service)

## 2. Database Setup

The easiest way to set up the PostgreSQL database is by using the `docker-compose.yml` file located in the `backend/` directory. This file defines a `db` service that will provision a PostgreSQL container.

To start the database along with the backend API:

1.  Navigate to the `backend/` directory:
    ```bash
    cd backend/
    ```
2.  Start the Docker Compose services:
    ```bash
    docker compose up -d --build
    ```
    This command will:
    *   Build the `backend` service image.
    *   Start the `db` (PostgreSQL) service.
    *   Start the `backend` (FastAPI) service.

The PostgreSQL database will be accessible on port `5432` on your Docker host.

### Database Connection Details (from `backend/.env.example` and `docker-compose.yml`)

*   **Host:** `db` (when connecting from `backend` service within Docker network), or `localhost` / `127.0.0.1` (when connecting from outside Docker, if port is mapped).
*   **Port:** `5432`
*   **Database Name:** `products_db`
*   **User:** `user`
*   **Password:** `password`

## 3. Database Migrations

Database schema changes are managed using Alembic, which is integrated with the `backend/` service. The initial schema for the `products` table is defined in the Alembic migration script located at `backend/alembic/versions/initial_products_table.py`.

To apply pending database migrations (e.g., after the database container is started for the first time or after schema changes):

1.  Ensure your Docker Compose services are running (`docker compose up -d`).
2.  Execute the Alembic upgrade command via the `backend` service:
    ```bash
    docker compose run --rm backend alembic upgrade head
    ```
    This command will connect to the `db` service and apply any unapplied migrations, creating the necessary tables and columns.

## 4. Database Schema Reference

For a quick reference of the `products` table schema, you can find a basic SQL script in this folder:

*   [`schema.sql`](schema.sql)

This script provides the `CREATE TABLE` statement for the `products` table, reflecting the structure defined by the Alembic migration. It is intended for reference or manual setup if not using Docker Compose and Alembic.

---

**Note:** For development, you might want to connect to the PostgreSQL database using a GUI tool (e.g., DBeaver, pgAdmin) or the `psql` command-line client. Use the connection details provided above.
