import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (storedUser && token) {
          setUser(JSON.parse(storedUser));
          // Potentially validate token with backend here if needed
        }
      } catch (error) {
        console.error("Failed to load user from localStorage", error);
        localStorage.clear(); // Clear invalid data
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      const { access_token, user: userData } = response.data;
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      return { success: false, message: error.response?.data?.detail || "Login failed" };
    }
  };

  const register = async (username, password) => {
    try {
      const response = await api.post('/auth/register', { username, password });
      // After successful registration, you might want to automatically log them in
      // For now, just return success and let them navigate to login
      return { success: true, message: response.data.message || "Registration successful!" };
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      return { success: false, message: error.response?.data?.detail || "Registration failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
