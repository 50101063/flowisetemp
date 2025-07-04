# Personal Recipe Card Organizer - Frontend

This folder contains the frontend application for the Personal Recipe Card Organizer, built with React, Vite, and Tailwind CSS.

## Technologies Used

*   **React 18.x**: A JavaScript library for building user interfaces.
*   **Vite 5.x**: A fast build tool that provides a lightning-fast development experience.
*   **Tailwind CSS 3.x**: A utility-first CSS framework for rapidly building custom designs.
*   **React Router DOM 6.x**: For declarative routing in React applications.
*   **Context API**: For simple state management.

## Setup Instructions

To get the frontend application up and running on your local machine, follow these steps:

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables (if any):**
    Create a `.env` file in the `frontend/` directory (if required by the backend API URL or other configurations). For example:
    ```
    VITE_API_BASE_URL=http://localhost:8000/api
    ```
    *Note: Replace `http://localhost:8000/api` with the actual base URL of your backend API.*

## Running the Application

To start the development server:

```bash
npm run dev
```

This will typically start the application on `http://localhost:5173` (or another available port). The application will automatically reload when you make changes to the source code.

## Build for Production

To build the application for production:

```bash
npm run build
```

This command will create a `dist/` folder containing the optimized production-ready static assets.

## Project Structure

```
frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Auth.jsx
│   │   ├── RecipeDetail.jsx
│   │   ├── RecipeForm.jsx
│   │   └── RecipeList.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## Available Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the app for production.
*   `npm run lint`: Lints the code.
*   `npm run preview`: Serves the production build locally.

---
