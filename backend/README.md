# Personal Recipe Card Organizer - Backend

This folder contains the backend services for the Personal Recipe Card Organizer application, built with FastAPI, Python, and PostgreSQL.

## Technologies Used

*   **Python 3.10+**
*   **FastAPI 0.100+**: Web framework for building APIs.
*   **SQLAlchemy**: ORM for interacting with PostgreSQL.
*   **Pydantic**: For data validation and serialization.
*   **python-jose[cryptography]**: For JWT authentication.
*   **Bcrypt**: For password hashing.
*   **Uvicorn**: ASGI server to run FastAPI.
*   **Psycopg2-binary**: PostgreSQL adapter for Python.

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/50101063/flowisetemp.git
    cd flowisetemp/backend
    ```

2.  **Create a Python virtual environment and activate it:**
    ```bash
    python -m venv venv
    # On Windows
    .\venv\Scripts\activate
    # On macOS/Linux
    source venv/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Database Setup (PostgreSQL):**
    *   Ensure you have a PostgreSQL server running.
    *   Create a database (e.g., `recipe_organizer_db`).
    *   Create a user with appropriate permissions.
    *   Update the database connection string in `main.py` or set it via environment variables (recommended for production).
        Example `DATABASE_URL`: `postgresql://user:password@host:port/database_name`

5.  **Environment Variables:**
    Create a `.env` file in the `backend/` directory with the following variables:
    ```
    DATABASE_URL="postgresql://user:password@host:5432/recipe_organizer_db"
    SECRET_KEY="your-super-secret-key" # Generate a strong random key
    ALGORITHM="HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES=30
    ```

    *   `DATABASE_URL`: Your PostgreSQL connection string.
    *   `SECRET_KEY`: A strong secret key used for JWT encoding. You can generate one using `openssl rand -hex 32`.
    *   `ALGORITHM`: The algorithm used for JWT signing (e.g., HS256).
    *   `ACCESS_TOKEN_EXPIRE_MINUTES`: How long the access token is valid.

## Running the Application

1.  **Activate your virtual environment** (if not already active).
2.  **Navigate to the `backend/` directory.**
3.  **Run the FastAPI application using Uvicorn:**
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload
    ```
    The `--reload` flag is useful for development as it restarts the server on code changes.

4.  **Access the API Documentation:**
    Once the server is running, you can access the interactive API documentation (Swagger UI) at:
    `http://127.0.0.1:8000/docs`
    or ReDoc at:
    `http://127.0.0.1:8000/redoc`

## API Endpoints

The API provides the following endpoints:

### User Management
*   `POST /register`: Register a new user.
*   `POST /token`: Authenticate user and get an access token.

### Recipe Management (Requires Authentication)
*   `POST /recipes/`: Create a new recipe.
*   `GET /recipes/`: Retrieve all recipes for the logged-in user.
*   `GET /recipes/{recipe_id}`: Retrieve a single recipe by ID.
*   `PUT /recipes/{recipe_id}`: Update an existing recipe.
*   `DELETE /recipes/{recipe_id}`: Delete a recipe.
*   `GET /recipes/search`: Search recipes by name or ingredients.
*   `GET /recipes/filter`: Filter recipes by category.

## Integration with Frontend

The frontend application (likely running on a different port/domain) will interact with this backend API. Ensure Cross-Origin Resource Sharing (CORS) is correctly configured in `main.py` if your frontend is served from a different origin than your backend.

## Database Schema

Refer to the `database/schema.sql` file in the `database/` folder for the detailed database schema (Users and Recipes tables).
