import React from 'react';

const InputField = ({ label, id, type = 'text', value, onChange, placeholder, required = false, className = '', rows = 1 }) => {
  const commonClasses = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {rows > 1 ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${commonClasses} resize-y`}
        ></textarea>
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={commonClasses}
        />
      )}
    </div>
  );
};

export default InputField;
