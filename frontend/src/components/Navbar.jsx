import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Recipe Organizer
        </Link>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-white hidden sm:inline">Welcome, {user?.username || 'User'}!</span>
              <Link to="/recipes/new" className="text-white hover:text-blue-200">
                Add Recipe
              </Link>
              <Button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-blue-200">
                Login
              </Link>
              <Link to="/register" className="text-white hover:text-blue-200">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
