import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import { AuthContext } from '../context/AuthContext';
import RecipeCard from '../components/RecipeCard';
import SearchFilter from '../components/SearchFilter';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const { recipes, isLoading, error, fetchRecipes } = useContext(RecipeContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Soup', 'Salad', 'Appetizer', 'Beverage', 'Other'];

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchRecipes(searchTerm, selectedCategory);
  }, [user, navigate, searchTerm, selectedCategory, fetchRecipes]);

  if (!user) {
    return null; // Redirect handled by useEffect
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Your Recipes</h1>

      <div className="flex justify-between items-center mb-6">
        <Link
          to="/recipes/new"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Add New Recipe
        </Link>
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      {isLoading && <p className="text-center text-lg">Loading recipes...</p>}
      {error && <p className="text-red-500 text-center text-lg">Error: {error}</p>}

      {!isLoading && recipes.length === 0 && (
        <p className="text-center text-gray-600 text-lg">No recipes found. Start by adding a new one!</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
