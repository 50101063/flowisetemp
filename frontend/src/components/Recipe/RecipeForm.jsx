import React, { useState, useEffect } from 'react';
import Input from '../Common/Input';
import Button from '../Common/Button';
import { createRecipe, getRecipe, updateRecipe } from '../../api/recipes';
import { useNavigate } from 'react-router-dom';

function RecipeForm({ recipeId, onSaveSuccess }) {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (recipeId) {
      setLoading(true);
      setError('');
      getRecipe(recipeId)
        .then(data => {
          setName(data.name);
          setIngredients(data.ingredients);
          setInstructions(data.instructions);
          setCategory(data.category || '');
        })
        .catch(err => {
          setError('Failed to load recipe data.');
          console.error('Error loading recipe:', err);
        })
        .finally(() => setLoading(false));
    } else {
      // Reset form for new recipe
      setName('');
      setIngredients('');
      setInstructions('');
      setCategory('');
    }
  }, [recipeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const recipeData = { name, ingredients, instructions, category };

    try {
      if (recipeId) {
        await updateRecipe(recipeId, recipeData);
        alert('Recipe updated successfully!');
      } else {
        await createRecipe(recipeData);
        alert('Recipe created successfully!');
      }
      onSaveSuccess(); // Callback to parent (e.g., refresh list, close form)
      navigate('/'); // Navigate to home after save
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to save recipe. Please check your input.');
      console.error('Error saving recipe:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{recipeId ? 'Edit Recipe' : 'Add New Recipe'}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Recipe Name</label>
        <Input
          id="name"
          type="text"
          placeholder="e.g., Classic Lasagna"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="ingredients" className="block text-gray-700 text-sm font-bold mb-2">Ingredients</label>
        <textarea
          id="ingredients"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y min-h-[100px]"
          placeholder="List ingredients, one per line or separated by commas."
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="instructions" className="block text-gray-700 text-sm font-bold mb-2">Instructions</label>
        <textarea
          id="instructions"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y min-h-[150px]"
          placeholder="Provide step-by-step cooking instructions."
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        ></textarea>
      </div>

      <div className="mb-6">
        <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category/Tag</label>
        <Input
          id="category"
          type="text"
          placeholder="e.g., Dinner, Dessert, Breakfast"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <Button type="submit" primary disabled={loading}>
        {loading ? 'Saving...' : (recipeId ? 'Update Recipe' : 'Add Recipe')}
      </Button>
    </form>
  );
}

export default RecipeForm;