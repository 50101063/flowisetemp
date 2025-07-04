# Personal Recipe Card Organizer - Frontend

This is the frontend application for the Personal Recipe Card Organizer, built with React, Vite, and Tailwind CSS. It provides a user interface for managing personal recipes, including authentication, recipe listing, creation, editing, deletion, search, and filtering.

## Technologies Used

*   **React 18.x:** A JavaScript library for building user interfaces.
*   **Vite 5.x:** A fast build tool that provides an excellent development experience.
*   **Tailwind CSS 3.x:** A utility-first CSS framework for rapidly building custom designs.
*   **React Router DOM 6.x:** For declarative routing in React applications.
*   **Context API & useState/useReducer:** For state management.

## Setup Instructions

To get this frontend application up and running on your local machine, follow these steps:

### Prerequisites

*   Node.js (LTS version recommended, e.g., 18.x or 20.x)
*   npm or yarn (npm is included with Node.js)

### Installation

1.  **Clone the repository:**
    Since this is part of a larger repository, navigate to the `frontend` directory after cloning the main project.
    ```bash
    git clone https://github.com/50101063/flowisetemp.git
    cd flowisetemp/frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Configuration

Create a `.env` file in the `frontend/` directory (at the same level as `package.json`). This file will store environment variables, such as the backend API URL.

```dotenv
VITE_API_BASE_URL=http://localhost:8000/api
```
**Note:** The backend API URL (`http://localhost:8000/api`) is a placeholder. You will need to replace this with the actual URL of your deployed or local backend API.

## Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will typically be accessible at `http://localhost:5173` (or another port if 5173 is in use).

2.  **Open in your browser:**
    Navigate to the URL provided by Vite in your terminal.

## Key Features

*   User Registration and Login
*   Display a list of personal recipes
*   Add, View, Edit, and Delete recipes
*   Search recipes by name or ingredients
*   Filter recipes by category/tag
*   Responsive design for various screen sizes

## Project Structure

```
frontend/
├── public/
│   └── index.html             # Main HTML file
├── src/
│   ├── api/                   # API service functions
│   │   ├── auth.js
│   │   └── recipes.js
│   ├── assets/                # Static assets (images, icons)
│   ├── components/            # Reusable UI components
│   │   ├── AuthForm.jsx
│   │   ├── RecipeCard.jsx
│   │   ├── RecipeForm.jsx
│   │   ├── SearchFilter.jsx
│   │   └── Navbar.jsx
│   ├── context/               # React Context for global state
│   │   ├── AuthContext.jsx
│   │   └── RecipeContext.jsx
│   ├── pages/                 # Page-level components (routes)
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── RecipeDetailPage.jsx
│   │   └── AddEditRecipePage.jsx
│   ├── App.jsx                # Main application component and router setup
│   ├── main.jsx               # Entry point for React application
│   └── index.css              # Tailwind CSS imports and global styles
├── .env                       # Environment variables
├── package.json               # Project dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
└── README.md                  # This file
```

## Dummy Data & API Simulation

For demonstration purposes, this frontend includes basic API simulation using local state to mimic backend interactions.
**To connect to a real backend, ensure your `VITE_API_BASE_URL` in `.env` is correctly set, and update the `src/api/*.js` files to make actual `fetch` or `axios` calls to your backend endpoints.**

## Contributing

Please refer to the main repository's `CONTRIBUTING.md` (if available) for guidelines.
