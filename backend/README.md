# Backend Product CRUD API

This folder contains the backend implementation for a simple Product CRUD (Create, Read, Update, Delete) API, developed using Python with FastAPI and PostgreSQL.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Setup and Installation](#setup-and-installation)
  - [Prerequisites](#prerequisites)
  - [Local Development (Docker Compose)](#local-development-docker-compose)
  - [Manual Setup (Python Virtual Environment)](#manual-setup-python-virtual-environment)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Base URL](#base-url)
  - [Product Endpoints](#product-endpoints)
- [Environment Variables](#environment-variables)
- [Database Migrations (Alembic)](#database-migrations-alembic)
- [Testing](#testing)

## Features

- Create new products with name, description, price, and stock quantity.
- Retrieve a list of all products.
- Retrieve details for a specific product by its ID.
- Update existing product details (full or partial updates).
- Delete products by ID.
- Automatic data validation and serialization using Pydantic.
- Interactive API documentation (Swagger UI/OpenAPI).

## Technology Stack

- **Language:** Python 3.10+
- **Web Framework:** FastAPI
- **ASGI Server:** Uvicorn
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy 2.0+
- **Database Migrations:** Alembic
- **Containerization:** Docker, Docker Compose

## Setup and Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (includes Docker Engine and Docker Compose)
- (Optional, for manual setup) [Python 3.10+](https://www.python.org/downloads/)

### Local Development (Docker Compose)

The easiest way to run the backend and its associated PostgreSQL database is using Docker Compose.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/50101063/flowisetemp.git
    cd flowisetemp/backend
    ```

2.  **Create a `.env` file:**
    Copy the `.env.example` file to `.env` and configure your database connection string. For local Docker Compose setup, the default values should work.
    ```bash
    cp .env.example .env
    ```
    *`.env` content (default for Docker Compose):*
    ```
    DATABASE_URL="postgresql://user:password@db:5432/products_db"
    ```

3.  **Build and run the Docker containers:**
    Navigate to the `backend/` directory and run:
    ```bash
    docker-compose up --build -d
    ```
    This command will:
    - Build the Docker image for the FastAPI application.
    - Start a PostgreSQL database container.
    - Start the FastAPI application container.
    - Run database migrations using Alembic to create the `products` table.

4.  **Verify containers are running:**
    ```bash
    docker-compose ps
    ```
    You should see `db` and `web` containers in a healthy state.

### Manual Setup (Python Virtual Environment)

If you prefer to run the application directly on your host machine without Docker (not recommended for production but useful for development):

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/50101063/flowisetemp.git
    cd flowisetemp/backend
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows: .\venv\Scripts\activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up PostgreSQL database:**
    You need a running PostgreSQL instance. Create a database (e.g., `products_db`) and a user with appropriate permissions.

5.  **Create a `.env` file:**
    Copy `.env.example` to `.env` and update `DATABASE_URL` with your PostgreSQL connection string (e.g., `postgresql://your_user:your_password@localhost:5432/products_db`).

6.  **Run database migrations:**
    ```bash
    alembic upgrade head
    ```

## Running the Application

Once the setup is complete:

- **With Docker Compose:** The application is already running on `http://localhost:8000`.
- **Manually:**
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload
    ```
    The `--reload` flag is useful for development as it automatically reloads the server on code changes.

The API documentation (Swagger UI) will be available at `http://localhost:8000/docs`.

## API Endpoints

### Base URL

`http://localhost:8000`

### Product Endpoints

#### 1. Create Product

- **Endpoint:** `POST /products/`
- **Description:** Adds a new product to the system.
- **Request Body (JSON):**
  ```json
  {
    "name": "Example Product",
    "description": "A detailed description of the example product.",
    "price": 29.99,
    "stock_quantity": 100
  }
  ```
- **Response (JSON - 201 Created):**
  ```json
  {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "name": "Example Product",
    "description": "A detailed description of the example product.",
    "price": 29.99,
    "stock_quantity": 100,
    "created_at": "2023-10-27T10:00:00.000000+00:00",
    "updated_at": "2023-10-27T10:00:00.000000+00:00"
  }
  ```
- **Error Responses:**
  - `400 Bad Request`: If a product with the same name already exists.
  - `422 Unprocessable Entity`: For validation errors (e.g., missing required fields, invalid data types).

#### 2. Get All Products

- **Endpoint:** `GET /products/`
- **Description:** Retrieves a list of all products.
- **Query Parameters (Optional):**
  - `skip`: Number of items to skip (default: 0)
  - `limit`: Maximum number of items to return (default: 100)
- **Response (JSON - 200 OK):**
  ```json
  [
    {
      "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      "name": "Example Product 1",
      "description": "Description 1",
      "price": 10.00,
      "stock_quantity": 50,
      "created_at": "2023-10-27T10:00:00.000000+00:00",
      "updated_at": "2023-10-27T10:00:00.000000+00:00"
    },
    {
      "id": "b2c3d4e5-f6a7-8901-2345-67890abcdef0",
      "name": "Example Product 2",
      "description": null,
      "price": 15.50,
      "stock_quantity": 200,
      "created_at": "2023-10-27T10:05:00.000000+00:00",
      "updated_at": "2023-10-27T10:05:00.000000+00:00"
    }
  ]
  ```

#### 3. Get Product by ID

- **Endpoint:** `GET /products/{product_id}`
- **Description:** Retrieves details for a specific product using its unique ID.
- **Path Parameter:** `product_id` (UUID)
- **Response (JSON - 200 OK):**
  ```json
  {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "name": "Example Product",
    "description": "A detailed description of the example product.",
    "price": 29.99,
    "stock_quantity": 100,
    "created_at": "2023-10-27T10:00:00.000000+00:00",
    "updated_at": "2023-10-27T10:00:00.000000+00:00"
  }
  ```
- **Error Responses:**
  - `404 Not Found`: If the product with the given ID does not exist.

#### 4. Update Product (Full Update)

- **Endpoint:** `PUT /products/{product_id}`
- **Description:** Modifies all details of an existing product using its ID. All fields are required in the request body.
- **Path Parameter:** `product_id` (UUID)
- **Request Body (JSON):**
  ```json
  {
    "name": "Updated Product Name",
    "description": "An updated description.",
    "price": 35.50,
    "stock_quantity": 120
  }
  ```
- **Response (JSON - 200 OK):**
  ```json
  {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "name": "Updated Product Name",
    "description": "An updated description.",
    "price": 35.50,
    "stock_quantity": 120,
    "created_at": "2023-10-27T10:00:00.000000+00:00",
    "updated_at": "2023-10-27T10:30:00.000000+00:00"
  }
  ```
- **Error Responses:**
  - `400 Bad Request`: If a product with the new name already exists.
  - `404 Not Found`: If the product with the given ID does not exist.
  - `422 Unprocessable Entity`: For validation errors.

#### 5. Partially Update Product

- **Endpoint:** `PATCH /products/{product_id}`
- **Description:** Modifies one or more details of an existing product using its ID. Only provide fields you want to update.
- **Path Parameter:** `product_id` (UUID)
- **Request Body (JSON):**
  ```json
  {
    "price": 30.00
  }
  ```
  Or:
  ```json
  {
    "description": "A shorter, updated description.",
    "stock_quantity": 90
  }
  ```
- **Response (JSON - 200 OK):**
  ```json
  {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "name": "Example Product",
    "description": "A shorter, updated description.",
    "price": 30.00,
    "stock_quantity": 90,
    "created_at": "2023-10-27T10:00:00.000000+00:00",
    "updated_at": "2023-10-27T10:35:00.000000+00:00"
  }
  ```
- **Error Responses:**
  - `400 Bad Request`: If a product with the new name already exists.
  - `404 Not Found`: If the product with the given ID does not exist.
  - `422 Unprocessable Entity`: For validation errors.

#### 6. Delete Product

- **Endpoint:** `DELETE /products/{product_id}`
- **Description:** Removes a product from the system using its ID.
- **Path Parameter:** `product_id` (UUID)
- **Response (204 No Content):** No content in the response body.
- **Error Responses:**
  - `404 Not Found`: If the product with the given ID does not exist.

## Environment Variables

The application uses the following environment variables, typically defined in a `.env` file:

- `DATABASE_URL`: The connection string for the PostgreSQL database. Example: `postgresql://user:password@host:port/dbname`.

## Database Migrations (Alembic)

Database schema changes are managed using Alembic. The `alembic.ini` and `alembic/versions/` directories are set up for this.

- To create a new migration script (after changing `models.py`):
  ```bash
  alembic revision --autogenerate -m "Description of changes"
  ```
- To apply pending migrations:
  ```bash
  alembic upgrade head
  ```
- To revert migrations:
  ```bash
  alembic downgrade -1 # Reverts the last migration
  ```

## Testing

(Future section: Details on how to run tests for the API.)
