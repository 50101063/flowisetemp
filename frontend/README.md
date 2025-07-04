# Personal Recipe Card Organizer - Frontend

This repository contains the frontend application for the Personal Recipe Card Organizer, built with React, Vite, and Tailwind CSS.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Personal Recipe Card Organizer is a web application designed to help home cooks and food enthusiasts digitize, store, organize, and quickly find their cherished recipes. This frontend application provides an intuitive and responsive user interface for managing recipes, including creation, viewing, editing, deletion, and basic search/filter functionalities.

## Features

- User Registration and Authentication (Login/Logout)
- Create, View, Edit, and Delete personal recipe entries
- Display a list of user's recipes
- Search recipes by name or ingredients
- Filter recipes by category/tag
- Responsive design for various screen sizes (desktop, tablet, mobile)

## Technology Stack

- **JavaScript Framework:** React 18.x
- **Build Tool:** Vite 5.x
- **Styling Framework:** Tailwind CSS 3.x
- **Routing:** React Router DOM 6.x

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (LTS version recommended, e.g., 18.x or 20.x)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js) or [Yarn](https://yarnpkg.com/getting-started/install)

## Setup and Installation

1.  **Clone the repository:**
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

3.  **Environment Variables:**
    Create a `.env` file in the `frontend/` directory based on `.env.example` (if provided, or create one with `VITE_API_BASE_URL`).
    ```
    VITE_API_BASE_URL=http://localhost:8000/api
    ```
    *Note: Replace `http://localhost:8000/api` with the actual URL of your backend API if it's deployed elsewhere.*

## Running the Application

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will typically run on `http://localhost:5173` (or another available port). Open your browser and navigate to this address.

## Project Structure

```
frontend/
├── public/
│   └── index.html             # Main HTML file
├── src/
│   ├── assets/                # Static assets (images, etc.)
│   ├── components/            # Reusable UI components
│   │   ├── Auth/              # Login, Register forms
│   │   ├── Recipes/           # Recipe-related components (list, form, detail)
│   │   ├── Layout/            # Navigation, headers, footers
│   │   └── Common/            # Generic UI elements (buttons, inputs)
│   ├── context/               # React Context for global state (e.g., AuthContext)
│   ├── services/              # API integration logic
│   ├── App.jsx                # Main application component, handles routing
│   ├── index.css              # Global styles and Tailwind CSS imports
│   └── main.jsx               # React entry point
├── .gitignore                 # Files/folders to ignore in Git
├── package.json               # Project dependencies and scripts
├── postcss.config.js          # PostCSS configuration for Tailwind CSS
├── README.md                  # This file
├── tailwind.config.js         # Tailwind CSS configuration
└── vite.config.js             # Vite build tool configuration
```

## API Endpoints

This frontend application interacts with the following backend API endpoints:

-   `/api/register`: User registration
-   `/api/login`: User login
-   `/api/recipes`: CRUD operations for recipes (GET, POST, PUT, DELETE)
-   `/api/recipes?search=<keyword>`: Search recipes
-   `/api/recipes?category=<tag>`: Filter recipes

*Refer to the backend documentation for full API specifications.*

## Contributing

Contributions are welcome! Please follow the standard GitHub flow: fork the repository, create a new branch, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
