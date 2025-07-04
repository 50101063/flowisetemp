import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-semibold transition duration-200
        ${disabled
          ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
        }
        ${className}
      `}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
