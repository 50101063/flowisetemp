# Personal Recipe Card Organizer - Frontend

This directory contains the frontend application for the Personal Recipe Card Organizer, built using React, Vite, and Tailwind CSS.

## Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Key Features Implemented](#key-features-implemented)

## Project Overview

The frontend provides the user interface for managing personal recipes. It allows users to:
- Register and Log In
- View a list of their recipes
- Create, View, Edit, and Delete individual recipes
- Search recipes by name or ingredient
- Filter recipes by category/tag
- Experience a fully responsive design across various devices.

## Technology Stack

- **JavaScript Framework:** React 18.x
- **Build Tool:** Vite 5.x
- **Styling Framework:** Tailwind CSS 3.x
- **Routing:** React Router DOM 6.x

## Setup Instructions

To get the frontend application up and running on your local machine, follow these steps:

1.  **Node.js and npm/yarn:** Ensure you have Node.js (v18 or higher recommended) and npm (or yarn) installed.
    -   You can download Node.js from [nodejs.org](https://nodejs.org/).
    -   Check installations:
        ```bash
        node -v
        npm -v
        # or
        yarn -v
        ```

2.  **Clone the Repository:** If you haven't already, clone the entire project repository:
    ```bash
    git clone https://github.com/50101063/flowisetemp.git
    cd flowisetemp
    ```

3.  **Navigate to Frontend Directory:**
    ```bash
    cd frontend
    ```

4.  **Install Dependencies:** Install all the required Node.js packages.
    ```bash
    npm install
    # or
    yarn install
    ```

## Running the Application

After installing the dependencies, you can start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will typically be accessible at `http://localhost:5173` (or another port if 5173 is in use). The console will show the exact URL.

## Project Structure

The `frontend/` directory is structured as follows:

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/       # Reusable UI components
│   │   ├── Navbar.jsx
│   │   └── ...
│   ├── pages/            # Page-level components (routes)
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── RecipeListPage.jsx
│   │   ├── RecipeDetailPage.jsx
│   │   └── RecipeFormPage.jsx
│   ├── App.jsx           # Main application component, handles routing
│   ├── main.jsx          # Entry point for React application
│   └── index.css         # Global CSS (Tailwind imports)
├── index.html            # Main HTML file
├── package.json          # Project dependencies and scripts
├── package-lock.json     # Locked dependencies (if using npm)
├── postcss.config.js     # PostCSS configuration for Tailwind
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.js        # Vite build tool configuration
```

## API Integration

The frontend interacts with the backend API (FastAPI) for all data operations (authentication, CRUD for recipes, search, filter).
- All API calls will be made to endpoints defined in the backend (e.g., `/api/register`, `/api/login`, `/api/recipes`).
- Authentication is handled via JWTs, which are sent in the `Authorization` header for protected routes.
- Error handling and loading states are implemented for a smooth user experience.

## Key Features Implemented (Placeholders)

This initial commit sets up the basic project structure and core components. Specific functionalities like full API integration, state management, and detailed form handling will be implemented in subsequent development phases.

-   **Routing:** Basic routing using React Router DOM is set up for different pages.
-   **Responsive Design:** Tailwind CSS is configured to enable responsive styling.
-   **Component Structure:** A modular component structure is established for maintainability.
