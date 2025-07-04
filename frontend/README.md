# Personal Recipe Card Organizer - Frontend

This repository contains the frontend application for the Personal Recipe Card Organizer, built using React, Vite, and Tailwind CSS. This application provides a user-friendly interface for managing personal recipes, including features for authentication, recipe CRUD operations, and searching/filtering.

## Features

*   **User Authentication:** Register, Login, and Logout functionality.
*   **Recipe Management:** Create, View, Edit, and Delete personal recipes.
*   **Search & Filter:** Easily find recipes by name, ingredient, or category.
*   **Responsive Design:** Adapts seamlessly to desktop, tablet, and mobile screens.
*   **Intuitive UI:** Clean and easy-to-navigate user interface.

## Technologies Used

*   **Frontend Framework:** React 18.x
*   **Build Tool:** Vite 5.x
*   **Styling:** Tailwind CSS 3.x
*   **Routing:** React Router DOM 6.x
*   **API Client:** Axios
*   **State Management:** React Context API (for global state)

## Setup and Running the Application

Follow these steps to get the frontend application up and running on your local machine.

### Prerequisites

*   Node.js (LTS version recommended, e.g., v18.x or v20.x)
*   npm or Yarn (npm is included with Node.js)

### Installation

1.  **Clone the repository:**
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
    # or if you use yarn
    # yarn install
    ```

### Configuration

Create a `.env` file in the `frontend/` directory (at the same level as `package.json`) and add the following environment variable:

```
VITE_API_BASE_URL=http://localhost:8000/api
```
*   **Note:** Replace `http://localhost:8000/api` with the actual URL of your backend API if it's hosted elsewhere.

### Running the Application

To start the development server:

```bash
npm run dev
# or if you use yarn
# yarn dev
```

This will typically start the application on `http://localhost:5173` (or another available port). The console will provide the exact URL.

## Project Structure

```
frontend/
├── public/                # Static assets (index.html, favicon, etc.)
├── src/                   # Main application source code
│   ├── assets/            # Images, icons, fonts
│   ├── components/        # Reusable UI components (e.g., Button, InputField, Navbar)
│   ├── pages/             # Top-level components representing distinct views/pages
│   ├── api/               # API service layer for backend communication
│   ├── context/           # React Context API providers for global state (e.g., AuthContext)
│   ├── hooks/             # Custom React hooks
│   ├── App.jsx            # Main application component, handles routing
│   └── main.jsx           # Entry point for the React application
├── index.html             # The main HTML file
├── package.json           # Project dependencies and scripts
├── postcss.config.js      # PostCSS configuration (for Tailwind CSS)
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite build tool configuration
└── README.md              # This file
```

## API Integration

The frontend interacts with the backend API to perform all data operations. Ensure your backend server is running and accessible at the `VITE_API_BASE_URL` specified in your `.env` file.

## Contributing

For any contributions, please follow the project's guidelines and submit pull requests.

## License

[Specify your license here, e.g., MIT, Apache 2.0]
