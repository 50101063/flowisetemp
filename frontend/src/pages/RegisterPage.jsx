import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const RegisterPage = () => {
  const { user, register, isLoading, error } = useContext(AuthContext);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (user) {
      navigate('/'); // Redirect to home if already logged in
    }
  }, [user, navigate]);

  const handleRegister = async (username, password) => {
    setSuccessMessage(null);
    const success = await register(username, password);
    if (success) {
      setSuccessMessage('Registration successful! Please log in.');
      // Optionally, navigate to login page after a short delay
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen-minus-navbar py-8">
      <AuthForm
        type="Register"
        onSubmit={handleRegister}
        isLoading={isLoading}
        error={error}
      />
      {successMessage && (
        <p className="text-green-500 text-center mt-4 absolute bottom-4 left-1/2 -translate-x-1/2 bg-white p-3 rounded shadow-lg">
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default RegisterPage;
