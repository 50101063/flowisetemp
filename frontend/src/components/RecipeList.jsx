import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // Predefined categories for filtering
  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Soup', 'Salad', 'Appetizer', 'Beverage', 'Baking', 'Other'];

  // Simulate fetching recipes from an API
  useEffect(() => {
    // In a real application, this would be an API call
    const fetchedRecipes = [
      { id: '1', name: 'Spicy Chicken Stir-fry', category: 'Dinner' },
      { id: '2', name: 'Classic Tomato Soup', category: 'Soup' },
      { id: '3', name: 'Blueberry Pancakes', category: 'Breakfast' },
      { id: '4', name: 'Garden Fresh Salad', category: 'Salad' },
      { id: '5', name: 'Chocolate Chip Cookies', category: 'Dessert' },
      { id: '6', name: 'Lemon Herb Roasted Chicken', category: 'Dinner' },
      { id: '7', name: 'Vegetable Lasagna', category: 'Dinner' },
      { id: '8', name: 'Simple Guacamole', category: 'Appetizer' },
      { id: '9', name: 'Iced Coffee', category: 'Beverage' },
      { id: '10', name: 'Homemade Bread', category: 'Baking' },
    ];
    setRecipes(fetchedRecipes);
  }, []);

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = (
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // In a real app, you'd search ingredients fetched from detail
      recipe.ingredients?.toLowerCase().includes(searchTerm.toLowerCase()) // Placeholder for ingredient search
    );
    const matchesCategory = filterCategory === 'All' || filterCategory === '' || recipe.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">My Recipes</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or ingredient..."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:w-auto"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <Link
          to="/add-recipe"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-center flex-shrink-0"
        >
          Add New Recipe
        </Link>
      </div>

      {filteredRecipes.length === 0 ? (
        <p className="text-gray-600 text-center">No recipes found matching your criteria.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.name}</h3>
                <p className="text-sm text-gray-600">Category: <span className="font-semibold">{recipe.category}</span></p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition duration-300"
                >
                  View
                </Link>
                <Link
                  to={`/edit-recipe/${recipe.id}`}
                  className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 transition duration-300"
                >
                  Edit
                </Link>
                {/* Delete functionality will be handled in RecipeDetail or via a dedicated action */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
