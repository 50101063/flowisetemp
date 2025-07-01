# Backend Application

This directory holds the backend code for the flowisetemp application.

Getting Started
------------------

1.  Install Python and pip:
    Make sure you have Python 3.6+ and pip installed on your system.

2.  Navigate to the backend directory:
    `cd myapp/backend`

3.  Install requirements:
    Install all required packages using pip:
   `pip install -r requirements.txt`
    [insert any other set-up steps here]

4.  Run the application:
    `python app.py`

General Information
--------------------

This Flask application exposes a hello world api endpoint at `/api/hello`.

The backend is expected to run on port 5000. It includes CORS enabled to allow cross-origin requests from the frontend application.

Inegration With Frontend
----------------------------------------

The frontend application (if applicable) is expected to make API calls to this backend at http://localhost:5000.
    - For example, the frontend can fetch data from `http://localhost:5000/api/hello`.
