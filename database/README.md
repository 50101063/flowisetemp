# Database Setup and Management for Personal Recipe Card Organizer

This directory contains all the necessary SQL scripts and documentation for setting up, managing, and interacting with the PostgreSQL database for the Personal Recipe Card Organizer application.

## Database Technology

The chosen database system is **PostgreSQL 15.x**.

## Schema Overview

The database comprises two main tables: `users` and `recipes`.

### `users` Table

Stores user authentication and profile information.

-   `id`: Primary Key, auto-incrementing integer.
-   `username`: Unique username for login, string.
-   `password_hash`: Hashed and salted password, string.
-   `created_at`: Timestamp of user creation.

### `recipes` Table

Stores individual recipe entries associated with a user.

-   `id`: Primary Key, auto-incrementing integer.
-   `user_id`: Foreign Key referencing `users.id`. Ensures recipes are linked to specific users. `ON DELETE CASCADE` ensures that if a user is deleted, all their recipes are also deleted.
-   `name`: Name of the recipe, string.
-   `ingredients`: Text field for recipe ingredients.
-   `instructions`: Text field for cooking instructions.
-   `category`: Optional category or tag for the recipe (e.g., "Breakfast", "Dinner", "Dessert").
-   `created_at`: Timestamp of recipe creation.
-   `updated_at`: Timestamp of the last update to the recipe. This field is automatically updated by a trigger.

## Setup Instructions

To set up the database, follow these steps:

1.  **Install PostgreSQL:**
    Ensure you have PostgreSQL 15.x or later installed on your system. You can download it from the official PostgreSQL website or use your system's package manager.

2.  **Create a Database:**
    Connect to your PostgreSQL server as a superuser or a user with database creation privileges and create a new database for the application.

    ```bash
    psql -U postgres
    CREATE DATABASE recipe_organizer_db;
    \q
    ```

3.  **Create a Database User (Optional but Recommended):**
    For security, it's recommended to create a dedicated user for the application with limited privileges.

    ```bash
    psql -U postgres
    CREATE USER recipe_app_user WITH PASSWORD 'your_secure_password';
    GRANT ALL PRIVILEGES ON DATABASE recipe_organizer_db TO recipe_app_user;
    \q
    ```

4.  **Run the Schema Script:**
    Navigate to this `database/` directory in your terminal and execute the `schema.sql` script against your newly created database.

    ```bash
    psql -U recipe_app_user -d recipe_organizer_db -f schema.sql
    ```
    (Replace `recipe_app_user` and `recipe_organizer_db` with your actual username and database name if different).

## Database Interaction

The backend application (developed using Python with FastAPI and SQLAlchemy) will interact with this database.

-   **Connection String:** The backend will use a connection string to connect to the database. Example for `recipe_app_user` on `localhost`:
    `postgresql://recipe_app_user:your_secure_password@localhost:5432/recipe_organizer_db`

-   **ORM Usage:** SQLAlchemy will be used to manage database sessions, perform CRUD operations, and handle data migrations.

## Backup and Recovery (Conceptual)

While specific scripts are not provided in this initial setup, a robust application would include:

-   **Regular Backups:** Implement daily or hourly automated backups of the `recipe_organizer_db` using `pg_dump`.
-   **Recovery Procedures:** Document and test procedures for restoring the database from backups in case of data loss or corruption.

## Data Migration (Conceptual)

For future schema changes, a database migration tool (e.g., Alembic for SQLAlchemy) should be employed to manage schema versioning and apply incremental updates without data loss.

---