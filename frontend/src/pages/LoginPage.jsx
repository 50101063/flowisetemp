import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const LoginPage = () => {
  const { user, login, isLoading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/'); // Redirect to home if already logged in
    }
  }, [user, navigate]);

  const handleLogin = async (username, password) => {
    const success = await login(username, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen-minus-navbar py-8">
      <AuthForm
        type="Login"
        onSubmit={handleLogin}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default LoginPage;