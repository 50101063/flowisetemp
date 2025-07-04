import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105">
      <h3 className="text-xl font-semibold mb-2 text-blue-700">{recipe.name}</h3>
      <p className="text-gray-600 text-sm mb-3">Category: <span className="font-medium">{recipe.category}</span></p>
      <Link
        to={`/recipes/${recipe.id}`}
        className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded transition duration-200"
      >
        View Recipe
      </Link>
    </div>
  );
};

export default RecipeCard;