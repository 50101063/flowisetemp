const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Login failed');
  }
  return response.json();
};

export const registerUser = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Registration failed');
  }
  return response.json();
};

export const getRecipes = async () => {
  const response = await fetch(`${API_BASE_URL}/recipes`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to fetch recipes');
  }
  return response.json();
};

export const getRecipeById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to fetch recipe');
  }
  return response.json();
};

export const createRecipe = async (recipeData) => {
  const response = await fetch(`${API_BASE_URL}/recipes`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(recipeData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to create recipe');
  }
  return response.json();
};

export const updateRecipe = async (id, recipeData) => {
  const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(recipeData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to update recipe');
  }
  return response.json();
};

export const deleteRecipe = async (id) => {
  const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to delete recipe');
  }
  return response.json();
};

export const searchRecipes = async (query) => {
  const response = await fetch(`${API_BASE_URL}/recipes/search?q=${encodeURIComponent(query)}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to search recipes');
  }
  return response.json();
};

export const filterRecipesByCategory = async (category) => {
  const response = await fetch(`${API_BASE_URL}/recipes/filter?category=${encodeURIComponent(category)}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to filter recipes');
  }
  return response.json();
};