# Personal Recipe Card Organizer - Frontend

This repository contains the frontend application for the Personal Recipe Card Organizer, built with React, Vite, and Tailwind CSS.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (Login, Register, Logout)
- View, Add, Edit, Delete recipes
- Search recipes by name or ingredients
- Filter recipes by category
- Responsive design for various screen sizes

## Technologies Used

- **React 18.x**: JavaScript library for building user interfaces.
- **Vite 5.x**: Next-generation frontend tooling for fast development.
- **Tailwind CSS 3.x**: A utility-first CSS framework for rapid UI development.
- **React Router DOM 6.x**: For declarative routing in React applications.
- **Context API**: For simple global state management.

## Setup and Installation

Follow these steps to set up and run the frontend application locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/50101063/flowisetemp.git
    cd flowisetemp/frontend
    ```

2.  **Install dependencies:**
    Navigate to the `frontend` directory and install the required Node.js packages:
    ```bash
    cd frontend
    npm install
    ```

## Running the Application

To start the development server:

```bash
npm run dev
```

The application will typically be available at `http://localhost:5173`.

## Project Structure

```
frontend/
├── public/                # Static assets (e.g., index.html)
├── src/                   # Source code
│   ├── assets/            # Images, icons, etc.
│   ├── components/        # Reusable UI components
│   ├── context/           # React Context API for global state
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Entry point for the React application
│   └── index.css          # Global CSS (Tailwind directives)
├── .gitignore             # Git ignore rules
├── package.json           # Project dependencies and scripts
├── postcss.config.js      # PostCSS configuration for Tailwind CSS
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite build configuration
└── README.md              # This file
```

## Contributing

Please refer to the main repository's `CONTRIBUTING.md` for contribution guidelines.

## License

This project is licensed under the MIT License. See the `LICENSE` file in the main repository for details.
