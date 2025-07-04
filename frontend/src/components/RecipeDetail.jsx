import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getRecipeById, deleteRecipe } from '../api/recipeApi';
import { useAuth } from '../context/AuthContext';

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (err) {
        setError(err.message);
        if (err.message === 'Not authenticated' || err.message === 'Token invalid') {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id, logout]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await deleteRecipe(id);
        navigate('/recipes'); // Redirect to recipe list after deletion
      } catch (err) {
        setError(err.message);
        if (err.message === 'Not authenticated' || err.message === 'Token invalid') {
          logout();
        }
      }
    }
  };

  if (loading) return <div className="text-center text-gray-600">Loading recipe details...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;
  if (!recipe) return <div className="text-center text-gray-600">Recipe not found.</div>;

  return (
    <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{recipe.name}</h2>
      <p className="text-lg text-gray-700 mb-2"><strong>Category:</strong> {recipe.category || 'N/A'}</p>
      
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Ingredients:</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{recipe.ingredients}</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Instructions:</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{recipe.instructions}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Link
          to={`/recipes/edit/${recipe.id}`}
          className="flex-1 text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Edit Recipe
        </Link>
        <button
          onClick={handleDelete}
          className="flex-1 text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete Recipe
        </button>
        <Link
          to="/recipes"
          className="flex-1 text-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back to List
        </Link>
      </div>
    </div>
  );
}

export default RecipeDetail;