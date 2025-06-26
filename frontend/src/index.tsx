import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'; // Import global styles
/*
 ** @constraints No local imports from offermart or mas/etc.
 */

format('react-dom/client');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);