import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Auth = ({ type }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'login') {
      // Simulate login API call
      console.log('Login attempt:', { username, password });
      alert('Login successful! (Simulated)');
      navigate('/recipes');
    } else {
      // Simulate register API call
      console.log('Register attempt:', { username, password });
      alert('Registration successful! Please login. (Simulated)');
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">{type === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username/Email:</label>
          <input
            type="text"
            id="username"
            name="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your username or email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${type === 'login' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
          >
            {type === 'login' ? 'Sign In' : 'Register'}
          </button>
          {type === 'login' ? (
            <Link to="/register" className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800">
              Don't have an account? Register
            </Link>
          ) : (
            <Link to="/login" className="inline-block align-baseline font-bold text-sm text-green-600 hover:text-green-800">
              Already have an account? Login
            </Link>
          )}
        </div>
      </form>
    </div>
  );
};

export default Auth;
