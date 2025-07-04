import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import RecipeList from './components/Recipes/RecipeList';
import RecipeForm from './components/Recipes/RecipeForm';
import RecipeDetail from './components/Recipes/RecipeDetail';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <RecipeList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/recipes/new"
                element={
                  <PrivateRoute>
                    <RecipeForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/recipes/edit/:id"
                element={
                  <PrivateRoute>
                    <RecipeForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/recipes/:id"
                element={
                  <PrivateRoute>
                    <RecipeDetail />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes to home */}
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
