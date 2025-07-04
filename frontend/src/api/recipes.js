const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Dummy data for simulation
let recipes = [
  { id: '1', name: 'Spaghetti Carbonara', ingredients: 'Pasta, Eggs, Pancetta, Pecorino Romano, Black Pepper', instructions: 'Cook pasta. Fry pancetta. Mix eggs, cheese, pepper. Combine.', category: 'Dinner' },
  { id: '2', name: 'Classic Pancakes', ingredients: 'Flour, Eggs, Milk, Baking Powder, Sugar', instructions: 'Mix dry ingredients, add wet. Cook on griddle.', category: 'Breakfast' },
  { id: '3', name: 'Tomato Soup', ingredients: 'Tomatoes, Onion, Garlic, Vegetable Broth, Basil', instructions: 'Sauté aromatics. Add tomatoes and broth. Simmer. Blend.', category: 'Soup' },
  { id: '4', name: 'Chocolate Chip Cookies', ingredients: 'Flour, Butter, Sugar, Brown Sugar, Eggs, Chocolate Chips', instructions: 'Cream butter and sugars. Add eggs. Mix dry ingredients. Fold in chips. Bake.', category: 'Dessert' },
];

const simulateApiCall = (data, delay = 300) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true, data });
    }, delay);
  });
};

export const getRecipes = async (query = '', category = '') => {
  // Dummy API call - replace with actual backend integration
  let filteredRecipes = recipes;

  if (query) {
    const lowerCaseQuery = query.toLowerCase();
    filteredRecipes = filteredRecipes.filter(recipe =>
      recipe.name.toLowerCase().includes(lowerCaseQuery) ||
      recipe.ingredients.toLowerCase().includes(lowerCaseQuery)
    );
  }

  if (category && category !== 'All') {
    filteredRecipes = filteredRecipes.filter(recipe =>
      recipe.category.toLowerCase() === category.toLowerCase()
    );
  }

  return simulateApiCall(filteredRecipes);
};

export const getRecipeById = async (id) => {
  // Dummy API call - replace with actual backend integration
  const recipe = recipes.find(r => r.id === id);
  return simulateApiCall(recipe);
};

export const createRecipe = async (recipeData) => {
  // Dummy API call - replace with actual backend integration
  const newRecipe = { id: String(Date.now()), ...recipeData };
  recipes.push(newRecipe);
  return simulateApiCall(newRecipe);
};

export const updateRecipe = async (id, recipeData) => {
  // Dummy API call - replace with actual backend integration
  recipes = recipes.map(recipe =>
    recipe.id === id ? { ...recipe, ...recipeData } : recipe
  );
  const updatedRecipe = recipes.find(r => r.id === id);
  return simulateApiCall(updatedRecipe);
};

export const deleteRecipe = async (id) => {
  // Dummy API call - replace with actual backend integration
  recipes = recipes.filter(recipe => recipe.id !== id);
  return simulateApiCall({ message: 'Recipe deleted' });
};