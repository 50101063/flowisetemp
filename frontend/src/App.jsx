import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/recipes/new" element={<RecipeForm />} />
            <Route path="/recipes/edit/:id" element={<RecipeForm />} />
            <Route path="/" element={<LoginForm />} /> {/* Default route */}
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;