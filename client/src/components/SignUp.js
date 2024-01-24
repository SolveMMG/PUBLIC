import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleSignUp = () => {
    axios.post('/signup', { username, password })
      .then(response => {
        // Assuming the backend returns an access token upon successful signup
        const { access_token } = response.data;
        // Store the token in localStorage or another secure storage method
        localStorage.setItem('token', access_token);
        // Redirect to the home page or another desired destination
        navigate('/');
      })
      .catch(error => {
        setError('Error signing up. Please try again.'); // Handle specific errors based on your backend
        console.error('SignUp Error:', error);
      });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SignUp;
