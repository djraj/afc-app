// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom'; // for navigation
import { login } from '../../utils/api';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate ();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password); // Call login function from api.js
      localStorage.setItem('token', response.token); // Store token in local storage
      navigate('/');
    } catch (err) {
      console.error(err);
      // Handle login errors (e.g., display error message)
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
