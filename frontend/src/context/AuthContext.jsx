import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginUser, registerUser } from '../api/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // In a real app, you would validate the token with the backend
      // For this example, we assume a valid token means logged in
      // You might decode the token to get user info if needed
      setUser({ username: 'User' }); // Placeholder user
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  const login = async (username, password) => {
    try {
      setLoading(true);
      const response = await loginUser({ username, password });
      const newToken = response.data.access_token; // Assuming backend returns access_token
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser({ username }); // Set user info upon successful login
      navigate('/'); // Redirect to dashboard or home page
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      return { success: false, error: error.response?.data?.detail || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, password) => {
    try {
      setLoading(true);
      await registerUser({ username, password });
      // After successful registration, automatically log them in or redirect to login page
      navigate('/login');
      return { success: true, message: 'Registration successful. Please log in.' };
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.detail || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isAuthenticated = !!token && !!user; // Check if both token and user object exist

  const value = { user, isAuthenticated, loading, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
