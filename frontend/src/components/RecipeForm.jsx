import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const RecipeForm = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // For edit mode
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');

  // Predefined categories for the dropdown
  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Soup', 'Salad', 'Appetizer', 'Beverage', 'Baking', 'Other'];

  useEffect(() => {
    if (mode === 'edit' && id) {
      // In a real application, fetch the recipe data by ID
      // For now, simulate fetching existing recipe data
      const fetchedRecipe = {
        id: id,
        name: `Existing Recipe ${id}`,
        ingredients: `Existing Ingredient 1\nExisting Ingredient 2`,
        instructions: `Existing Step 1.\nExisting Step 2.`,
        category: 'Dinner',
      };
      setName(fetchedRecipe.name);
      setIngredients(fetchedRecipe.ingredients);
      setInstructions(fetchedRecipe.instructions);
      setCategory(fetchedRecipe.category);
    }
  }, [mode, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipeData = {
      name,
      ingredients,
      instructions,
      category,
    };

    if (mode === 'add') {
      // Simulate API call to add new recipe
      console.log('Adding recipe:', recipeData);
      alert('Recipe added successfully! (Simulated)');
    } else {
      // Simulate API call to update existing recipe
      console.log(`Updating recipe ${id}:`, recipeData);
      alert('Recipe updated successfully! (Simulated)');
    }
    navigate('/recipes'); // Redirect to recipe list
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {mode === 'add' ? 'Add New Recipe' : `Edit Recipe: ${name}`}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="recipeName" className="block text-gray-700 text-sm font-bold mb-2">Recipe Name:</label>
            <input
              type="text"
              id="recipeName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="ingredients" className="block text-gray-700 text-sm font-bold mb-2">Ingredients:</label>
            <textarea
              id="ingredients"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Enter ingredients, one per line or separated by commas."
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="instructions" className="block text-gray-700 text-sm font-bold mb-2">Instructions:</label>
            <textarea
              id="instructions"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-48"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Enter cooking instructions."
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category/Tag:</label>
            <select
              id="category"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {mode === 'add' ? 'Add Recipe' : 'Update Recipe'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/recipes')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
