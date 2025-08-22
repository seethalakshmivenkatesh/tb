import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';
import { useAuth } from '../auth/AuthContext';

const Logout = () => {
  const { setCartItems } = useContext(CartContext);
  const { logout } = useAuth();

  useEffect(() => {
    setCartItems([]);
    logout();
    alert("Logged Out Successfully.");
  }, [setCartItems, logout]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 -mt-20 ">
      <div className="bg-white/60 backdrop-blur-md border border-purple-200 shadow-xl p-10 rounded-3xl text-center max-w-md">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">You’ve been logged out 💫</h1>
        <p className="text-gray-700 mb-6">
          Thank you for visiting <span className="font-semibold text-pink-600">Shopping Time</span>. Hope to see you again soon!
        </p>
        <Link
          to="/Login"
          className="inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
             text-white font-semibold px-6 py-2 rounded-lg border border-purple-600 
             shadow-md hover:scale-105 transition-transform duration-300">
          Log In Again
        </Link>


        <div className="mt-4">
          <Link
            to="/"
            className="text-sm text-blue-600 underline hover:text-blue-800 border border-transparent px-3 py-1 rounded"
          >
            Go to Homepage
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Logout;
