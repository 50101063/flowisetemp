import React, { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser } from '../api/auth';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to load user from localStorage on initial render
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const data = await loginUser(username, password);
      localStorage.setItem('token', data.access_token);
      // In a real app, you'd decode the token or fetch user details
      // For this MVP, we'll just store the username
      const loggedInUser = { username: username };
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error; // Re-throw to be caught by the component
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, password) => {
    setLoading(true);
    try {
      const data = await registerUser(username, password);
      // After successful registration, automatically log in the user
      await login(username, password); 
      return data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const authContextValue = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
