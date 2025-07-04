import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8 shadow-inner">
      <div className="container mx-auto text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Personal Recipe Card Organizer. All rights reserved.</p>
        <p>Built with React, Vite, and Tailwind CSS.</p>
      </div>
    </footer>
  );
};

export default Footer;
