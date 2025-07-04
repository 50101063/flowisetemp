import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Placeholder for fetching recipe details based on ID
  // In a real application, you would fetch data from an API
  const recipe = {
    id: id,
    name: `Sample Recipe ${id}`,
    ingredients: `Ingredient 1, Ingredient 2, Ingredient 3`,
    instructions: `Step 1: Do something. Step 2: Do something else. Step 3: Enjoy!`,
    category: 'Dinner',
  };

  if (!recipe) {
    return <div className="p-4 text-center text-red-500">Recipe not found.</div>;
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${recipe.name}"?`)) {
      // Simulate delete API call
      alert(`Recipe "${recipe.name}" deleted! (Simulated)`);
      navigate('/recipes'); // Redirect to recipe list after deletion
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{recipe.name}</h2>
        <p className="text-sm text-gray-600 mb-4">Category: <span className="font-semibold">{recipe.category}</span></p>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Ingredients:</h3>
          <p className="text-gray-700 whitespace-pre-line">{recipe.ingredients}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Instructions:</h3>
          <p className="text-gray-700 whitespace-pre-line">{recipe.instructions}</p>
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          <Link
            to={`/edit-recipe/${recipe.id}`}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Edit Recipe
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
          >
            Delete Recipe
          </button>
          <Link
            to="/recipes"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            Back to Recipes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
