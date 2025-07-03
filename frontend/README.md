# Online Course Registration System Frontend

This is the frontend application for the Online Course Registration System, built with React and Vite.

## Technologies Used

*   **React 18+**: A JavaScript library for building user interfaces.
*   **Vite 4+**: A fast build tool that provides a lightning-fast development experience.
*   **React Query**: For efficient data fetching, caching, and synchronization with server state.
*   **Zustand**: A small, fast, and scalable bearbones state-management solution (used for minimal global state if needed).
*   **HTML, CSS (with potential for Tailwind CSS)**: Standard web technologies for structure and styling.

## Project Structure

```
frontend/
├── public/             # Static assets (e.g., vite.svg)
├── src/
│   ├── assets/         # Images, icons, etc.
│   ├── components/     # Reusable UI components
│   ├── pages/          # Top-level components for different views/routes
│   ├── services/       # API interaction logic (e.g., axios instances, React Query hooks)
│   ├── store/          # Zustand store definitions (if global state is needed)
│   ├── App.css         # Main application CSS
│   ├── App.jsx         # Main application component
│   ├── index.css       # Global styles
│   └── main.jsx        # Entry point for the React application
├── index.html          # Main HTML file
├── package.json        # Project dependencies and scripts
├── README.md           # This file
└── vite.config.js      # Vite configuration
```

## Setup and Running the Application

Follow these steps to get the frontend application up and running on your local machine.

### Prerequisites

*   Node.js (LTS version recommended, e.g., 18.x or 20.x)
*   npm (Node Package Manager) or Yarn

### Installation

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone https://github.com/50101063/flowisetemp.git
    cd flowisetemp
    ```

2.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    # OR
    yarn install
    ```

### Running the Application

To run the application in development mode:

```bash
npm run dev
# OR
yarn dev
```

This will start the Vite development server. You can usually access the application at `http://localhost:5173` (or another port if 5173 is in use). The console will show the exact URL.

### Building for Production

To build the application for production (this will create an optimized `dist` folder):

```bash
npm run build
# OR
yarn build
```

After building, you can preview the production build locally:

```bash
npm run preview
# OR
yarn preview
```

### Linting

To run ESLint to check for code quality and style issues:

```bash
npm run lint
# OR
yarn lint
```

## API Integration

The frontend will interact with the backend API (developed using Django REST Framework) for all data operations. API endpoints and request/response formats will be defined in collaboration with the Backend Development team. `React Query` will be used to manage server state efficiently.

## Contributing

Contributions are welcome! Please ensure your code adheres to the established coding standards and includes appropriate tests.

---

*This `README.md` provides basic instructions. Further details on specific UI components, state management patterns, and advanced API integrations will be added as development progresses.*