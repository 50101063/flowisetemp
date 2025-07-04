import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Auth from './components/Auth';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';

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
          <Route path="/login" element={<Auth type="login" />} />
          <Route path="/register" element={<Auth type="register" />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/add-recipe" element={<RecipeForm mode="add" />} />
          <Route path="/edit-recipe/:id" element={<RecipeForm mode="edit" />} />
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
