# Personal Recipe Card Organizer - Frontend

This directory contains the frontend application for the Personal Recipe Card Organizer, built with React, Vite, and Tailwind CSS.

## Technologies Used

*   **React 18.x:** A JavaScript library for building user interfaces.
*   **Vite 5.x:** A fast build tool that provides a lightning-fast development experience.
*   **Tailwind CSS 3.x:** A utility-first CSS framework for rapidly building custom designs.
*   **React Router DOM 6.x:** For declarative routing in React applications.
*   **Context API:** For state management.

## Project Structure

```
frontend/
├── public/
│   └── index.html             # Main HTML file
├── src/
│   ├── api/                   # API interaction logic
│   ├── components/            # Reusable UI components
│   ├── context/               # React Context for global state
│   ├── pages/                 # Page-level components (views)
│   ├── App.jsx                # Main application component
│   ├── index.css              # Global styles (Tailwind base, components, utilities)
│   └── main.jsx               # Entry point for the React application
├── .gitignore                 # Git ignore file for frontend
├── package.json               # Project dependencies and scripts
├── postcss.config.js          # PostCSS configuration for Tailwind CSS
├── tailwind.config.js         # Tailwind CSS configuration
└── vite.config.js             # Vite build configuration
└── README.md                  # This file
```

## Setup and Running the Application

To get the frontend application up and running on your local machine, follow these steps:

### Prerequisites

*   Node.js (LTS version recommended, e.g., 18.x or 20.x)
*   npm or yarn (npm is included with Node.js)

### Installation

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # OR
    yarn install
    ```

### Running in Development Mode

To start the development server with hot-reloading:

```bash
npm run dev
# OR
yarn dev
```

This will typically start the application on `http://localhost:5173` (or another available port). The console will show the exact URL.

### Building for Production

To create a production-ready build of the application:

```bash
npm run build
# OR
yarn build
```

This command will compile and optimize your code into the `dist/` directory, ready for deployment.

### Previewing the Production Build

You can locally preview the production build:

```bash
npm run preview
# OR
yarn preview
```

## API Integration

The application will communicate with the backend API. Ensure the backend server is running and accessible. API endpoints are configured in `src/api/` files. You might need to adjust the base URL for API calls depending on your backend deployment.

## Contributing

Please refer to the main project's `CONTRIBUTING.md` (if available) for contribution guidelines.
