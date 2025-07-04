import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginUser, registerUser } from '../api/recipeApi';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // In a real app, you'd validate the token with a backend call
      // For this MVP, we assume a stored token is valid until logout
      // You might also decode JWT to get user info if needed
      setUser({ username: localStorage.getItem('username') }); // Store username too
    } else {
      setUser(null);
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      const data = await loginUser(username, password);
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('username', username); // Store username
      setToken(data.access_token);
      setUser({ username });
      navigate('/recipes');
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message };
    }
  };

  const register = async (username, password) => {
    try {
      const data = await registerUser(username, password);
      // After successful registration, automatically log them in or redirect to login
      await login(username, password); // Auto-login after registration
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);