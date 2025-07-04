# Personal Recipe Card Organizer - Frontend

This folder contains the frontend application for the Personal Recipe Card Organizer, built with React, Vite, and Tailwind CSS.

## Technologies Used

*   **React 18.x**: A JavaScript library for building user interfaces.
*   **Vite 5.x**: A fast build tool that provides a lightning-fast development experience.
*   **Tailwind CSS 3.x**: A utility-first CSS framework for rapidly styling components.
*   **React Router DOM 6.x**: For declarative routing in React applications.
*   **Context API**: For simple state management across components.

## Setup and Running the Application

To set up and run the frontend application locally, follow these steps:

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    Ensure you have Node.js and npm (or yarn) installed.
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will typically be available at `http://localhost:5173/`.

4.  **Build for production (optional):**
    ```bash
    npm run build
    # or
    yarn build
    ```
    This will create a `dist` folder with the optimized production build.

## Project Structure

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   └── Navbar.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Key Features Implemented

*   User Authentication (Login/Register forms - UI only)
*   Responsive Design using Tailwind CSS
*   Basic React component structure
*   Client-side routing with React Router DOM
*   Placeholder for Context API for state management

## API Integration

This frontend application will interact with the backend API for user authentication and recipe management. Ensure the backend server is running and accessible. API endpoints will be configured in the application for `http://localhost:8000` (default FastAPI server address).
