import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import { AuthContext } from '../context/AuthContext';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { fetchRecipeById, removeRecipe, isLoading, error } = useContext(RecipeContext);
  const [recipe, setRecipe] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const getRecipe = async () => {
      setIsPageLoading(true);
      const fetchedRecipe = await fetchRecipeById(id);
      if (fetchedRecipe) {
        setRecipe(fetchedRecipe);
      } else {
        // Recipe not found or error, navigate to home
        navigate('/');
      }
      setIsPageLoading(false);
    };
    getRecipe();
  }, [id, user, navigate, fetchRecipeById]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      const success = await removeRecipe(id);
      if (success) {
        navigate('/');
      }
    }
  };

  if (isPageLoading) {
    return <div className="text-center text-lg mt-8">Loading recipe...</div>;
  }

  if (!recipe) {
    return <div className="text-center text-lg mt-8 text-red-500">Recipe not found.</div>; // Should be caught by navigate, but as a fallback
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto my-8">
      <h1 className="text-4xl font-bold text-blue-800 mb-4 text-center">{recipe.name}</h1>
      <p className="text-gray-600 text-lg mb-6 text-center">Category: <span className="font-semibold text-blue-600">{recipe.category}</span></p>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Ingredients:</h2>
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">{recipe.ingredients}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Instructions:</h2>
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">{recipe.instructions}</p>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Link
          to={`/recipes/${recipe.id}/edit`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-5 rounded transition duration-200"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-5 rounded transition duration-200"
          disabled={isLoading}
        >
          {isLoading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
      {error && <p className="text-red-500 text-center mt-4">Error: {error}</p>}
    </div>
  );
};

export default RecipeDetailPage;