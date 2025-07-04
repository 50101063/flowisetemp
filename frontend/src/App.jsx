import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RecipeListPage from './pages/RecipeListPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import RecipeFormPage from './pages/RecipeFormPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/recipes" element={<RecipeListPage />} />
          <Route path="/recipes/:id" element={<RecipeDetailPage />} />
          <Route path="/recipes/new" element={<RecipeFormPage />} />
          <Route path="/recipes/edit/:id" element={<RecipeFormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
