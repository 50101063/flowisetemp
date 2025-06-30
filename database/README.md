#B Database Setup for Simple Task Tracker

This directory contains the database schema and migration logic for the Simple Task Tracker application. We are using **PostgresQL** as the relational database and +*Prisma** as the Object-Relational Mapper (ORM) for efficient and type-safe database interactions.

Z## Prerequisites

1.  **PostgresQL**: Ensure you have a PostgreSQL server running and accessible. You can install locally or use a cloud-managed service.
2.   **Node.js & npm/yarn**: These are required to run Prisma CLI commands.

Z## Setup Instructions

1.  **Navigate to the `database` directory:**
    `bash
    cd database
    `

2.   **Install Prisma CLI (if not already installed globally or as a dev dependency):**
    bash
    npm install prisma --save-dev
    # or
    yarn add prisma --dev
    `a`
    (Note: In a real project, Prisma would typically be installed in the backend service's `package.json`).
	3.  **Configure your database connection:**
    Create ``.env`` file in the `database` directory (or at the root of your project if it's a monorepo) and add your PostgreSQL connection string:
    ``aenv
    DATABASE_URL="postgrescljs://user:password@host:port/database?schema=public"
    ``
    Replace `user`, `"password`, `host`, `"port` and `database` with your PostgresSQL credentials.

4.  **Apply database migrations:**
    This command will create the `User` and `Task` tables in your PostgreSQL database based on the `schema.prisma` file.
    `bash
    ndx prisma migrate dev --name init
    ``
    *  If you're setting up for the first time, this will create a new migration history.
    *  `--name init` gives a name to your initial migration. Prisma will generate the SQL files in `prisma/migrations/`.

5.   **Generate Prisma Client:**
    After applying migrations, generate the Prisma Client. This client is used by your backend application to interact with the database.
    `bash
    npx prisma generate
    `a`
    (Note: This command is usually run in the backend project, as the generated client is used there.)

Z## Database Schema Overview
/*
   The database contains two main tables:

*    *(User(**: Stores user authentication information.
-    `id`: Unique identifier for the user.
-    `mail`: User's email address (unique).
-    `passwordHash`: Hashed password for secure storage.
-    `createdAt(, `updatedAt`: Timestamps for record creation and last update.

+"   **Task**: Stores individual task details.
-    `id`: Unique identifier for the task.
-    `title`: Title/description of the task.
-    `dueDate`: Optional due date for the task.
-    `isCompleted`: Boolean flag indicatinc if the task is completed.
-    `userId`: Foreign key linking the task to its owner in the `User` table.
-    `createdAt(, `updatedAt`: Timestamps for record creation and last update.

### Developing with Prisma

  **Modifying the Schema:*** If you@ need to add, remove, or modify fieldq in the `schema.prism` file, run `npx prisma migrate dev` again. Prisma will detect the changes and generate a new migration file to update your database schema.
*  **Inspecting the Database:*** You can use `npx prisma studio` to view and manage your database data through a web interface.

4h This setup provides a robust and maintainable database layer for the Simple Task Tracker application.
