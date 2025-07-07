# Integration Layer

This folder contains the necessary files to integrate and orchestrate the frontend, backend, and database components of the Simple Product CRUD API. The integration is primarily managed through Docker Compose, which allows for defining and running multi-container Docker applications.

## Components Overview

*   **`docker-compose.yml`**: Defines the services (database, backend API, frontend Nginx) and their dependencies, networks, and volumes.
*   **`frontend_nginx/`**: Contains the Dockerfile and Nginx configuration to serve the static frontend files and proxy API requests to the backend.
    *   **`frontend_nginx/Dockerfile`**: Builds the Nginx container, copying the Nginx configuration and the static frontend assets from the `frontend/` directory.
    *   **`frontend_nginx/nginx.conf`**: Nginx configuration that serves `index.html` and other static files for the frontend, and proxies all requests to `/api/` to the backend service.

## How the Integration Works

1.  **Database (`db` service):** A PostgreSQL container is started, providing persistent storage for product data. It is configured with environment variables for database name, user, and password.
2.  **Backend API (`backend` service):** The FastAPI application is built using its `Dockerfile` located in the `backend/` directory. It connects to the `db` service using the `DATABASE_URL` environment variable. Before starting the Uvicorn server, it runs `alembic upgrade head` to ensure the database schema is up-to-date. The backend exposes its API on port `8000` within the Docker network.
3.  **Frontend (`frontend` service):** An Nginx container is built using the `frontend_nginx/Dockerfile`. This Dockerfile copies the static HTML, CSS, and JavaScript files from the main `frontend/` directory of the repository into the Nginx web root. The `nginx.conf` is configured to serve these static files. Crucially, it also acts as a reverse proxy for API calls:
    *   Any request to the Nginx server (on host port `8080`) that starts with `/api/` (e.g., `http://localhost:8080/api/products`) is forwarded to the `backend` service (e.g., `http://backend:8000/products`). This setup effectively handles CORS issues and provides a single entry point for the application.

## Setup and Running the Integrated System

To run the entire integrated system, ensure you have Docker and Docker Compose installed on your machine.

1.  **Navigate to the `integration/` directory:**
    ```bash
    cd integration/
    ```

2.  **Start the services using Docker Compose:**
    ```bash
    docker-compose up --build
    ```
    *   `--build`: This flag ensures that Docker images for the backend and frontend (Nginx) are rebuilt, incorporating any recent changes in their respective source directories.

    Docker Compose will:
    *   Create a Docker network.
    *   Start the PostgreSQL database container.
    *   Wait for the database to be healthy.
    *   Build and start the backend API container, running Alembic migrations and then the FastAPI application.
    *   Build and start the Nginx frontend container, serving the static frontend files.

3.  **Verify the services are running:**
    You should see logs from all three services in your terminal. Ensure there are no critical errors.

4.  **Access the Frontend Application:**
    Open your web browser and navigate to: `http://localhost:8080`

    You should see the Simple Product CRUD UI. From here, you can interact with the API.

## Testing and Verification

Once the system is up and running:

*   **Frontend Interaction:** Use the UI to create, read, update, and delete products. Observe the network requests in your browser's developer tools to confirm that API calls are being made to `http://localhost:8080/api/` and are successfully proxied to the backend.
*   **Direct Backend Access (Optional):** While the frontend proxies requests, you can still directly test the backend API (if exposed) or inspect its logs to confirm data operations.
*   **Database Inspection (Optional):** If you have a PostgreSQL client, you can connect to `localhost:5432` (using the credentials from `.env.example` or `docker-compose.yml`) and verify the data directly in the `products` table.

## Troubleshooting

*   **"Address already in use"**: Ensure no other applications are using ports `5432` (PostgreSQL), `8000` (Backend), or `8080` (Frontend Nginx) on your host machine.
*   **Containers exiting immediately**: Check the logs of the specific container (`docker-compose logs <service_name>`) to identify the error. Common issues include incorrect environment variables, port conflicts, or application-level errors.
*   **Frontend not loading or API calls failing**: Verify the `nginx.conf` proxy settings and ensure the `backend` service is healthy and accessible from the `frontend` container within the Docker network.
*   **Database connection issues**: Check the `DATABASE_URL` in the backend service's environment variables in `docker-compose.yml` and ensure the database service is healthy.

This `integration/` layer provides a complete, runnable environment for the Simple Product CRUD API, facilitating seamless interaction between all its components.