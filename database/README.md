# Database Folder for Personal Recipe Card Organizer

This `database/` folder contains all the SQL scripts and related configurations for the Personal Recipe Card Organizer application's data layer. The database is designed to store user accounts and their associated recipe entries, ensuring data integrity and efficient retrieval.

## 1. Database Technologies

*   **Database System:** PostgreSQL 15.x
*   **ORM (used by Backend):** SQLAlchemy (Python)

PostgreSQL was chosen for its robustness, ACID compliance, performance, and scalability, making it an ideal relational database for this application.

## 2. Schema Overview

The database schema is defined in `schema.sql` and consists of two primary tables:

### `users` Table
Stores user account information.

| Column Name   | Data Type                   | Constraints                                |
| :------------ | :-------------------------- | :----------------------------------------- |
| `id`          | `SERIAL` (Primary Key)      | Unique identifier for each user            |
| `username`    | `VARCHAR(255)`              | Unique, Not Null                           |
| `password_hash` | `VARCHAR(255)`              | Not Null (stores securely hashed password) |
| `created_at`  | `TIMESTAMP WITH TIME ZONE`  | Default: `CURRENT_TIMESTAMP`               |

### `recipes` Table
Stores individual recipe entries, linked to a user.

| Column Name   | Data Type                   | Constraints                                |
| :------------ | :-------------------------- | :----------------------------------------- |
| `id`          | `SERIAL` (Primary Key)      | Unique identifier for each recipe          |
| `user_id`     | `INTEGER`                   | Not Null, Foreign Key to `users.id`        |
| `name`        | `VARCHAR(255)`              | Not Null                                   |
| `ingredients` | `TEXT`                      | Stores multi-line ingredient list          |
| `instructions`| `TEXT`                      | Stores multi-line cooking instructions     |
| `category`    | `VARCHAR(100)`              | e.g., "Breakfast", "Dinner", "Dessert"   |
| `created_at`  | `TIMESTAMP WITH TIME ZONE`  | Default: `CURRENT_TIMESTAMP`               |
| `updated_at`  | `TIMESTAMP WITH TIME ZONE`  | Default: `CURRENT_TIMESTAMP`, auto-updated |

**Relationship:** There is a one-to-many relationship between `users` and `recipes`, meaning one user can have many recipes.

**Indexes:** Indexes are created on `user_id` (for efficient lookup of a user's recipes), `name` (for recipe name search), and `category` (for filtering recipes).

## 3. Local Development Setup Instructions (PostgreSQL)

To set up the database for local development, follow these steps:

1.  **Install PostgreSQL:**
    *   Download and install PostgreSQL 15.x from the official website ([https://www.postgresql.org/download/](https://www.postgresql.org/download/)) or use a package manager (e.g., `brew install postgresql` on macOS, `sudo apt-get install postgresql` on Debian/Ubuntu).

2.  **Create a Database User (Optional but Recommended):**
    It's good practice to create a dedicated user for your application.
    ```bash
    sudo -u postgres psql
    CREATE USER recipe_user WITH PASSWORD 'your_secure_password';
    ALTER USER recipe_user WITH CREATEDB; -- Grant permission to create databases
    \q
    ```
    Replace `your_secure_password` with a strong password.

3.  **Create the Database:**
    ```bash
    sudo -u postgres psql
    CREATE DATABASE recipe_organizer OWNER recipe_user;
    \q
    ```
    Or, if you logged in as `recipe_user` after granting `CREATEDB`:
    ```bash
    psql -U recipe_user -d postgres
    CREATE DATABASE recipe_organizer;
    \q
    ```

4.  **Apply the Schema:**
    Navigate to this `database/` folder in your terminal and apply the schema to your newly created database.
    ```bash
    psql -U recipe_user -d recipe_organizer -f schema.sql
    ```
    You will be prompted for the password for `recipe_user`.

    This command will create the `users` and `recipes` tables, set up foreign key constraints, and add indexes.

## 4. Integration with Backend

The backend application (developed using Python FastAPI and SQLAlchemy) will connect to this PostgreSQL database using a connection string. This connection string is typically configured via environment variables.

Example `DATABASE_URL` for local development:

```
DATABASE_URL="postgresql://recipe_user:your_secure_password@localhost:5432/recipe_organizer"
```

The SQLAlchemy ORM in the backend will handle all database interactions, abstracting the raw SQL queries defined in `schema.sql`. It will manage sessions, execute CRUD operations, and ensure proper data mapping between Python objects and database rows.

## 5. Backup and Recovery

Regular backups of the `recipe_organizer` database are crucial. PostgreSQL provides tools like `pg_dump` for creating backups and `pg_restore` for restoring them.

Example backup command:
```bash
pg_dump -U recipe_user -d recipe_organizer > recipe_organizer_backup.sql
```

## 6. Security Considerations

*   **Password Hashing:** User passwords are not stored directly but as secure hashes (`password_hash`).
*   **Least Privilege:** The database user (`recipe_user`) should ideally be granted only the necessary permissions required by the application.
*   **Secure Connection:** Ensure that the connection between the backend and the database is secure, especially in production environments (e.g., using SSL/TLS).

---