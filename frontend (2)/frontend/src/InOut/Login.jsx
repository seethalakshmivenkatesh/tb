import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../auth/AuthContext";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const ok = await login({ username, password });
    if (ok) {
      navigate("/homeparent");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex mt-5 justify-center">
      <div className="theme-box p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium">User Name</label>
            <input
              type="text"
              placeholder="Username"
              className="theme-input w-full italic mb-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="theme-input w-full italic mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="theme-button w-full mt-2 text-center block"
          >
            Log In
          </button>

          <div className="italic flex font-sans mt-4 font-extralight">
            <p>Don't have an account?</p>
            <Link to="/register" className="ml-2 hover:underline theme-box">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>

  );
};

export default Login;
