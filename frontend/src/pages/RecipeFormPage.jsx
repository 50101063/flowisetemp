import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';

const RecipeFormPage = () => {
  const { id } = useParams(); // Will be defined if editing an existing recipe
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      const fetchRecipe = async () => {
        try {
          const response = await api.get(`/recipes/${id}`);
          setRecipe(response.data);
        } catch (err) {
          setError("Failed to load recipe for editing.");
          console.error("Error fetching recipe for edit:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchRecipe();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      [name]: value,
    }));
    setError(null); // Clear error on change
    setSuccess(null); // Clear success on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isEditMode) {
        await api.put(`/recipes/${id}`, recipe);
        setSuccess("Recipe updated successfully!");
      } else {
        await api.post('/recipes/', recipe);
        setSuccess("Recipe created successfully!");
        setRecipe({ // Clear form after successful creation
          name: '',
          ingredients: '',
          instructions: '',
          category: '',
        });
      }
      // Optionally navigate back to recipes list or detail page after a short delay
      setTimeout(() => navigate('/recipes'), 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.detail || "An unexpected error occurred.";
      setError(`Failed to save recipe: ${errorMessage}`);
      console.error("Error saving recipe:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return <div className="text-center text-lg mt-8">Loading recipe data...</div>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {isEditMode ? 'Edit Recipe' : 'Create New Recipe'}
      </h1>

      {error && <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</p>}
      {success && <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Recipe Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div>
          <label htmlFor="ingredients" className="block text-gray-700 text-sm font-bold mb-2">Ingredients:</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            rows="6"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="instructions" className="block text-gray-700 text-sm font-bold mb-2">Instructions:</label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            rows="8"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category/Tag:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={recipe.category}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., Dinner, Breakfast, Dessert"
          />
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? 'Saving...' : (isEditMode ? 'Update Recipe' : 'Add Recipe')}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)} // Go back to the previous page
            className="inline-block align-baseline font-bold text-sm text-gray-500 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeFormPage;
