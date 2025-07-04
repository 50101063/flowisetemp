import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
          Recipe Organizer
        </Link>
        <ul className="flex space-x-4">
          {user ? (
            <>
              <li>
                <Link to="/recipes" className="hover:text-blue-200 transition-colors">
                  My Recipes
                </Link>
              </li>
              <li>
                <Link to="/recipes/new" className="hover:text-blue-200 transition-colors">
                  Add Recipe
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-1 px-3 rounded-md transition-colors"
                >
                  Logout ({user.username})
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-blue-200 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-blue-200 transition-colors">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
