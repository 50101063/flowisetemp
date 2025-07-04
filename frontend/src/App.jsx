import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

// Placeholder components (will be implemented in detail later)
const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
    <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Your Recipe Organizer!</h1>
    <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
      Digitize, organize, and quickly find all your cherished recipes. Say goodbye to scattered notes and hello to effortless cooking.
    </p>
    <div className="space-x-4">
      <Link to="/login" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">Login</Link>
      <Link to="/register" className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition duration-300">Register</Link>
    </div>
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    // Simulate login success
    alert('Login functionality will be implemented here.');
    navigate('/recipes'); // Redirect to recipes list after simulated login
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Login</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username/Email:</label>
          <input type="text" id="username" name="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Your username or email" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input type="password" id="password" name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="********" />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</button>
          <Link to="/register" className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800">Don't have an account? Register</Link>
        </div>
      </form>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const handleRegister = () => {
    // Simulate registration success
    alert('Registration functionality will be implemented here.');
    navigate('/login'); // Redirect to login after simulated registration
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Register</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="reg-username" className="block text-gray-700 text-sm font-bold mb-2">Username/Email:</label>
          <input type="text" id="reg-username" name="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Choose a username or email" />
        </div>
        <div className="mb-6">
          <label htmlFor="reg-password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input type="password" id="reg-password" name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Create a password" />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
          <Link to="/login" className="inline-block align-baseline font-bold text-sm text-green-600 hover:text-green-800">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
};

const Recipes = () => (
  <div className="p-4">
    <h2 className="text-3xl font-semibold text-gray-800 mb-6">My Recipes</h2>
    <p className="text-gray-600">This is where the list of recipes will be displayed, along with search and filter options.</p>
    <Link to="/add-recipe" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add New Recipe</Link>
  </div>
);

const AddRecipe = () => (
  <div className="p-4">
    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add New Recipe</h2>
    <p className="text-gray-600">Form to add a new recipe will go here.</p>
    <Link to="/recipes" className="mt-4 inline-block px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Back to Recipes</Link>
  </div>
);

const RecipeDetail = () => (
  <div className="p-4">
    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Recipe Details</h2>
    <p className="text-gray-600">Full details of a selected recipe will be displayed here.</p>
    <Link to="/recipes" className="mt-4 inline-block px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Back to Recipes</Link>
  </div>
);

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
    <h2 className="text-3xl font-semibold text-gray-800 mb-6">404 - Page Not Found</h2>
    <p className="text-gray-600">The page you are looking for does not exist.</p>
    <Link to="/" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Go to Home</Link>
  </div>
);

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Simulate logout
    alert('Logout functionality will be implemented here.');
    navigate('/'); // Redirect to home after simulated logout
  };

  return (
    <header className="bg-blue-700 text-white p-4 shadow-md flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">Recipe Organizer</Link>
      <nav>
        <ul className="flex space-x-4">
          <li><Link to="/recipes" className="hover:text-blue-200">My Recipes</Link></li>
          <li><button onClick={handleLogout} className="hover:text-blue-200">Logout</button></li>
        </ul>
      </nav>
    </header>
  );
};

function App() {
  return (
    <Router>
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
        &copy; {new Date().getFullYear()} Personal Recipe Card Organizer. All rights reserved.
      </footer>
    </Router>
  );
}

export default App;
