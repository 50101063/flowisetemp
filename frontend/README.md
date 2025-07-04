# Personal Recipe Card Organizer - Frontend

This is the frontend application for the Personal Recipe Card Organizer, built with React, Vite, and Tailwind CSS.

## Technologies Used

*   **React 18.x:** A JavaScript library for building user interfaces.
*   **Vite 5.x:** A fast build tool for modern web projects.
*   **Tailwind CSS 3.x:** A utility-first CSS framework for rapid UI development.
*   **React Router DOM 6.x:** For declarative routing in React applications.
*   **React Context API:** For global state management (e.g., authentication).

## Setup and Running the Application

Follow these steps to get the frontend application up and running on your local machine.

### Prerequisites

*   Node.js (LTS version recommended, e.g., 18.x or 20.x)
*   npm or yarn (npm is typically installed with Node.js)

### Installation

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

To run the application in development mode with hot-reloading:

```bash
npm run dev
# or
yarn dev
```

This will typically start the development server at `http://localhost:5173` (or another available port). The console will show the exact URL.

### Building for Production

To build the application for production (optimizing for size and performance):

```bash
npm run build
# or
yarn build
```

The optimized static files will be generated in the `dist/` directory.

### Previewing the Production Build

You can preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

### Environment Variables

The application may require environment variables, especially for connecting to the backend API. Create a `.env` file in the `frontend/` directory if needed.

Example `.env` file:
```
VITE_API_BASE_URL=http://localhost:8000/api
```
Remember to restart your development server after changing `.env` files.

## Project Structure

```
frontend/
├── public/                 # Static assets (e.g., index.html)
├── src/                    # Source code
│   ├── assets/             # Images, icons, etc.
│   ├── components/         # Reusable UI components
│   ├── pages/              # Top-level page components (routes)
│   ├── context/            # React Context for global state
│   ├── api/                # API service integrations
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Entry point for React application
│   └── index.css           # Global styles and Tailwind directives
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration (for Tailwind)
├── README.md               # This file
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite build configuration
```

## API Integration

The frontend interacts with the backend API for user authentication and recipe management. The API base URL can be configured via `VITE_API_BASE_URL` in the `.env` file.

---