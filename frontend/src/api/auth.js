import api from './axiosConfig';

export const registerUser = async (username, password) => {
  try {
    const response = await api.post('/register', { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Registration failed';
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await api.post('/token', {
      username: username,
      password: password,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    // FastAPI's OAuth2 password flow returns a 400 for invalid credentials
    throw error.response?.data?.detail || 'Login failed';
  }
};

export const logoutUser = () => {
  // For JWT, logout is typically handled by removing the token client-side
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  // You might want to invalidate the token on the backend if it's a blacklist approach
  // but for simple JWT, client-side removal is sufficient.
};
