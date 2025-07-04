const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const login = async (username, password) => {
  // Dummy API call - replace with actual backend integration
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username === 'user' && password === 'password') {
        resolve({ success: true, token: 'fake-jwt-token', user: { username: 'user' } });
      } else {
        resolve({ success: false, message: 'Invalid credentials' });
      }
    }, 500);
  });
};

export const register = async (username, password) => {
  // Dummy API call - replace with actual backend integration
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username && password) {
        resolve({ success: true, message: 'Registration successful. Please log in.' });
      } else {
        resolve({ success: false, message: 'Username and password are required.' });
      }
    }, 500);
  });
};