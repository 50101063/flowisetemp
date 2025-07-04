import api from './axiosConfig';

// Get all recipes for the authenticated user
export const getRecipes = async (searchQuery = '', category = '') => {
  try {
    const response = await api.get('/recipes', {
      params: {
        search: searchQuery,
        category: category,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Failed to fetch recipes';
  }
};

// Get a single recipe by ID
export const getRecipeById = async (id) => {
  try {
    const response = await api.get(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Failed to fetch recipe';
  }
};

// Create a new recipe
export const createRecipe = async (recipeData) => {
  try {
    const response = await api.post('/recipes/', recipeData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Failed to create recipe';
  }
};

// Update an existing recipe
export const updateRecipe = async (id, recipeData) => {
  try {
    const response = await api.put(`/recipes/${id}`, recipeData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Failed to update recipe';
  }
};

// Delete a recipe
export const deleteRecipe = async (id) => {
  try {
    const response = await api.delete(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Failed to delete recipe';
  }
};
