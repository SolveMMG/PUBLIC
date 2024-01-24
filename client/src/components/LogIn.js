import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Contexts';

const LogIn = () => {
  const { dispatch } = useAuth();
  const  navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', formData);
      const { access_token } = response.data;

      // Store the access token in localStorage
      localStorage.setItem('token', access_token);

      // Dispatch login action to update state
      dispatch({ type: 'LOGIN', payload: { /* Additional user data if needed */ } });

      // Redirect to the home page or another route
      navigate.push('/');
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (show error message, etc.)
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LogIn;
