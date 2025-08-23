


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './CartContext';
import './index.css';
import { AuthProvider } from './auth/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
