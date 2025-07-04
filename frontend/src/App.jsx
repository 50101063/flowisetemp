import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RecipeProvider } from './context/RecipeContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddEditRecipePage from './pages/AddEditRecipePage';
import RecipeDetailPage from './pages/RecipeDetailPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <RecipeProvider>
          <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto p-4">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/recipes/new" element={<AddEditRecipePage />} />
                <Route path="/recipes/:id" element={<RecipeDetailPage />} />
                <Route path="/recipes/:id/edit" element={<AddEditRecipePage />} />
              </Routes>
            </main>
          </div>
        </RecipeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;