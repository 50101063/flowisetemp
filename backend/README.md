# Personal Recipe Card Organizer - Backend

This folder contains the backend services for the Personal Recipe Card Organizer web application. The backend is built with Python using the FastAPI framework, SQLAlchemy for ORM, and PostgreSQL as the database. It provides RESTful API endpoints for user authentication, recipe management (CRUD), searching, and filtering.

## Technologies Used

*   **Language:** Python 3.10+
*   **Web Framework:** FastAPI 0.100+
*   **Database:** PostgreSQL 15.x
*   **ORM:** SQLAlchemy
*   **Authentication:** JWT (JSON Web Tokens)
*   **Password Hashing:** `bcrypt` via `passlib`
*   **Environment Management:** `python-dotenv`

## Project Structure

```
backend/
├── main.py             # Main FastAPI application, defines API routes
├── database.py         # SQLAlchemy engine, session management, and base
├── models.py           # SQLAlchemy ORM models (User, Recipe)
├── schemas.py          # Pydantic models for request/response validation
├── auth.py             # Authentication utilities (JWT, password hashing, current user dependency)
├── crud.py             # Database interaction functions (CRUD operations)
├── requirements.txt    # Python dependencies
└── README.md           # This file
```

## Setup Instructions

Follow these steps to set up and run the backend locally:

### 1. Prerequisites

*   Python 3.10 or higher
*   PostgreSQL 15.x installed and running
*   `pip` (Python package installer)

### 2. Clone the Repository

If you haven't already, clone the main project repository:

```bash
git clone https://github.com/50101063/flowisetemp.git
cd flowisetemp
```

### 3. Navigate to the Backend Directory

```bash
cd backend
```

### 4. Create a Virtual Environment (Recommended)

It's good practice to use a virtual environment to manage dependencies:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 5. Install Dependencies

Install the required Python packages:

```bash
pip install -r requirements.txt
```

### 6. Database Setup

Ensure your PostgreSQL server is running.

**A. Create a Database:**

Create a new database for the application. You can do this via `psql` or a GUI tool like pgAdmin:

```sql
CREATE DATABASE recipe_organizer_db;
```

**B. Environment Variables:**

Create a `.env` file in the `backend/` directory with your database connection string and a secret key for JWTs. Replace the placeholders with your actual database credentials:

```dotenv
DATABASE_URL="postgresql://user:password@host:port/recipe_organizer_db"
SECRET_KEY="your_super_secret_jwt_key_here" # Use a strong, random key
ALGORITHM="HS256" # JWT algorithm
ACCESS_TOKEN_EXPIRE_MINUTES=30 # JWT expiry time
```

**Example `DATABASE_URL`:**
`postgresql://postgres:mysecretpassword@localhost:5432/recipe_organizer_db`

**C. Apply Migrations (Initial Schema Creation):**

The `database.py` file contains the `Base.metadata.create_all(engine)` call. When you run `main.py` for the first time, it will create the tables defined in `models.py` if they don't already exist.

### 7. Run the Backend Application

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

*   `uvicorn main:app`: Tells Uvicorn to run the `app` object from `main.py`.
*   `--reload`: Automatically reloads the server when code changes are detected (useful for development).
*   `--host 0.0.0.0`: Makes the server accessible from other devices on your network (for development purposes).
*   `--port 8000`: Runs the server on port 8000.

You should see output indicating that the FastAPI application is running.

### 8. Access the API Documentation

Once the server is running, you can access the interactive API documentation (Swagger UI) at:

`http://localhost:8000/docs`

Or ReDoc at:

`http://localhost:8000/redoc`

This documentation allows you to test the API endpoints directly.

## Integration with Frontend

The backend exposes RESTful API endpoints. The frontend application (developed with React) will make HTTP requests to these endpoints to perform user authentication and recipe management operations.

**Base API URL:** `http://localhost:8000/api/v1` (adjust if you change the port or host)

Ensure your frontend is configured to point to the correct backend URL.

## Security Considerations

*   **Secret Key:** Keep your `SECRET_KEY` in the `.env` file secure and never commit it to version control. Generate a strong, random key for production.
*   **Password Hashing:** Passwords are hashed using `bcrypt` before storage.
*   **HTTPS:** In a production environment, ensure the backend is served over HTTPS to encrypt all communication.
*   **CORS:** Cross-Origin Resource Sharing (CORS) is enabled in `main.py` to allow the frontend (running on a different origin) to communicate with the backend. Adjust `allow_origins` in `main.py` for production.
