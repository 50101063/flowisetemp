import React, { useState, useEffect } from 'react';
import { getRecipes, searchRecipes, filterRecipesByCategory } from '../api/recipeApi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      let data;
      if (searchTerm) {
        data = await searchRecipes(searchTerm);
      } else if (filterCategory) {
        data = await filterRecipesByCategory(filterCategory);
      } else {
        data = await getRecipes();
      }
      setRecipes(data);
    } catch (err) {
      setError(err.message);
      if (err.message === 'Not authenticated' || err.message === 'Token invalid') {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [searchTerm, filterCategory]); // Refetch when search term or filter changes

  const handleSearch = (e) => {
    e.preventDefault();
    setFilterCategory(''); // Clear category filter when searching
    fetchRecipes(); // Trigger fetch with current searchTerm
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
    setSearchTerm(''); // Clear search term when filtering by category
  };

  if (loading) return <div className="text-center text-gray-600">Loading recipes...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  const categories = [...new Set(recipes.map(recipe => recipe.category))].filter(Boolean);

  return (
    <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Welcome, {user?.username}! Your Recipes</h2>
        <button
          onClick={logout}
          className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex-grow flex gap-2">
          <input
            type="text"
            placeholder="Search by name or ingredient..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Search
          </button>
        </form>
        <select
          className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={filterCategory}
          onChange={handleFilterChange}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <Link
          to="/recipes/new"
          className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Add New Recipe
        </Link>
      </div>

      {recipes.length === 0 ? (
        <p className="text-center text-gray-600">No recipes found. Start by adding a new one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{recipe.name}</h3>
              <p className="text-sm text-gray-500 mb-4">Category: {recipe.category || 'N/A'}</p>
              <Link
                to={`/recipes/${recipe.id}`}
                className="inline-block bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipeList;