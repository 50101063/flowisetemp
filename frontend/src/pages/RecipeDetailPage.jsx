import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dummy data for demonstration. Replace with actual API call.
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const dummyRecipes = [
          { id: 1, name: 'Spaghetti Bolognese', ingredients: 'Ground beef, Tomatoes, Onion, Garlic, Pasta, Herbs', instructions: 'Cook beef. Add tomatoes and herbs. Simmer. Serve with pasta.', category: 'Dinner' },
          { id: 2, name: 'Chocolate Chip Cookies', ingredients: 'Flour, Sugar, Butter, Eggs, Chocolate Chips', instructions: 'Mix ingredients. Bake until golden brown.', category: 'Dessert' },
          { id: 3, name: 'Tomato Soup', ingredients: 'Tomatoes, Broth, Cream, Basil', instructions: 'Blend tomatoes. Heat with broth and cream. Garnish with basil.', category: 'Soup' },
          { id: 4, name: 'Breakfast Burrito', ingredients: 'Eggs, Tortilla, Cheese, Sausage, Salsa', instructions: 'Scramble eggs. Cook sausage. Assemble in tortilla with cheese and salsa.', category: 'Breakfast' },
          { id: 5, name: 'Chicken Curry', ingredients: 'Chicken, Curry paste, Coconut milk, Vegetables, Rice', instructions: 'Cook chicken. Add curry paste, coconut milk, and vegetables. Simmer. Serve with rice.', category: 'Dinner' },
        ];

        const foundRecipe = dummyRecipes.find(r => r.id === parseInt(id));

        if (foundRecipe) {
          setRecipe(foundRecipe);
        } else {
          setError('Recipe not found.');
        }
      } catch (err) {
        setError('Failed to fetch recipe.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-600">Loading recipe...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  if (!recipe) {
    return <div className="text-center text-gray-600">Recipe not found.</div>; // Should be caught by error state
  }

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.name}</h1>
      <p className="text-gray-600 text-sm mb-6">Category: {recipe.category}</p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Ingredients:</h2>
        <p className="text-gray-800 whitespace-pre-wrap">{recipe.ingredients}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Instructions:</h2>
        <p className="text-gray-800 whitespace-pre-wrap">{recipe.instructions}</p>
      </div>

      <div className="flex justify-end space-x-4 mt-8">
        <Link
          to={`/recipes/edit/${recipe.id}`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Edit Recipe
        </Link>
        <Link
          to="/recipes"
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Back to List
        </Link>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
