import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/api';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await api.get(`/recipes/${id}`);
        setRecipe(response.data);
      } catch (err) {
        setError("Failed to fetch recipe. It might not exist or you don't have permission.");
        console.error("Error fetching recipe:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await api.delete(`/recipes/${id}`);
        alert("Recipe deleted successfully!");
        navigate('/recipes');
      } catch (err) {
        setError("Failed to delete recipe.");
        console.error("Error deleting recipe:", err);
      }
    }
  };

  if (loading) {
    return <div className="text-center text-lg mt-8">Loading recipe...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-lg mt-8">Error: {error}</div>;
  }

  if (!recipe) {
    return <div className="text-center text-lg mt-8">Recipe not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md mt-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.name}</h1>
      <p className="text-sm text-gray-500 mb-6">Category: <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">{recipe.category || 'Uncategorized'}</span></p>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Ingredients:</h2>
        <p className="text-gray-700 whitespace-pre-line">{recipe.ingredients}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Instructions:</h2>
        <p className="text-gray-700 whitespace-pre-line">{recipe.instructions}</p>
      </div>

      <div className="flex space-x-4 mt-6">
        <Link 
          to={`/recipes/edit/${recipe.id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Edit Recipe
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Delete Recipe
        </button>
        <Link 
          to="/recipes"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Back to List
        </Link>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
