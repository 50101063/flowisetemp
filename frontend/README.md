# Product CRUD Frontend

This is a simple web-based frontend application for managing products, designed to interact with the Simple CRUD API backend.

## Technologies Used

*   **HTML5:** For structuring the web page.
*   **CSS3:** For styling the user interface.
*   **JavaScript (ES6+):** For dynamic interactions and API communication.

## Features

*   View a list of all products.
*   Add a new product (name, description, price, stock quantity).
*   Edit existing product details.
*   Delete products.

## Setup and Execution

To run this frontend application, you need to ensure the backend API is running and accessible.

### Prerequisites

*   A modern web browser (Chrome, Firefox, Edge, Safari, etc.).
*   The **backend API must be running** and accessible at `http://localhost:8000`. Please refer to the backend's `README.md` for instructions on how to set up and run the backend.

### Running the Frontend

This frontend is a static HTML, CSS, and JavaScript application. You can run it directly in your web browser.

1.  **Navigate to the `frontend/` directory:**
    ```bash
    cd frontend/
    ```

2.  **Open `index.html` in your web browser:**
    You can typically do this by double-clicking the `index.html` file in your file explorer.
    Alternatively, you can open your browser and use `File > Open File...` and select `index.html`.

    **Note on CORS:**
    If you encounter Cross-Origin Resource Sharing (CORS) errors in your browser's console when the frontend tries to communicate with the backend, it means your browser is preventing the frontend (served from `file://` or a different origin) from making requests to `http://localhost:8000`.
    The FastAPI backend is typically configured to handle CORS for `http://localhost:8000` or specific origins. If you are running the frontend directly from `file://`, you might need to:
    *   **Option A (Recommended for development): Use a simple local web server.**
        You can use Python's built-in HTTP server for this.
        From the `frontend/` directory, run:
        ```bash
        python -m http.server 8000
        # or any other port, e.g., 8080
        python -m http.server 8080
        ```
        Then, open your browser and go to `http://localhost:8000` (or `http://localhost:8080` if you used that port).
        **Important:** If you run the frontend on a port other than 8000 (e.g., 8080), and the backend is on 8000, ensure the backend's CORS configuration allows requests from `http://localhost:8080`. The current `script.js` assumes the backend is on `http://localhost:8000`.

    *   **Option B (Less recommended for general use, but quick for testing): Disable CORS in your browser.**
        This is generally **NOT recommended for security reasons** and should only be done for local development and testing in a controlled environment. Instructions vary by browser. For Chrome, you might run it with a `--disable-web-security` flag (use a separate profile for this).

### Interacting with the Application

Once `index.html` is open in your browser:

*   **Add Product:** Fill in the "Add/Edit Product" form and click "Add Product".
*   **View Products:** All products will be listed in the "All Products" table automatically upon loading and after any successful CUD operation.
*   **Edit Product:** Click the "Edit" button next to a product in the table. The form will be pre-filled. Modify details and click "Update Product". Click "Cancel Edit" to revert the form.
*   **Delete Product:** Click the "Delete" button next to a product. A confirmation dialog will appear.

## Project Structure

```
frontend/
├── index.html          # Main HTML file
├── style.css           # Stylesheet for the application
└── script.js           # JavaScript logic for API interaction and DOM manipulation
└── README.md           # This file
```

## Communication with Backend Developer

*   The frontend expects the backend API to be available at `http://localhost:8000`. If the backend is deployed at a different URL or port, the `API_BASE_URL` constant in `script.js` will need to be updated accordingly.
*   The frontend relies on the exact API endpoint paths and JSON payload structures as specified in the Solution Architect's document (`/products`, `/products/{id}`). Any deviations in the backend implementation will require corresponding frontend adjustments.
*   The frontend assumes the backend handles CORS appropriately for local development (e.g., allowing requests from `http://localhost:8000` or `file://`).

---
