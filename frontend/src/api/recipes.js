const API_BASE_URL = 'http://localhost:8000'; // Replace with your backend URL

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const getAllRecipes = async (searchTerm = '', category = '') => {
  let url = `${API_BASE_URL}/recipes`;
  const params = new URLSearchParams();

  if (searchTerm) {
    params.append('search', searchTerm);
  }
  if (category) {
    params.append('category', category);
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to fetch recipes.');
  }
  return response.json();
};

export const getRecipeById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to fetch recipe.');
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
    throw new Error(errorData.detail || 'Failed to create recipe.');
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
    throw new Error(errorData.detail || 'Failed to update recipe.');
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
    throw new Error(errorData.detail || 'Failed to delete recipe.');
  }
  return { message: 'Recipe deleted successfully.' };
};