import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/Contexts';
import axios from 'axios'; // Import axios for making requests

export default function NavBar() {
  const { authState, dispatch } = useAuth();

  const handleLogout = () => {
    // Perform logout logic here
    axios.post('/logout', {}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})  // Adjust the endpoint based on your backend
      .then(() => {
        // Clear token from localStorage (assuming you're using localStorage for token storage)
        localStorage.removeItem('token');
        // Dispatch logout action to update state
        dispatch({ type: 'LOGOUT' });
      })
      .catch(error => {
        console.error('Logout error:', error);
      });
  };

  return (
    <div className="ui secondary pointing menu">
      {authState.isAuthenticated ? (
        <>
          <Link to='/' className="active item">
            Home
          </Link>
          <Link to='liked_photos' className="item">
            Liked
          </Link>
          <Link to='posted' className="item">
            Posted
          </Link>
          <Link to='post_photo' className="item">
            Create
          </Link>
          <div className="right menu">
            <a className="ui item" onClick={handleLogout}>
              LogOut
            </a>
          </div>
        </>
      ) : (
        <>
          <Link to='sign_up' className="item">
            Sign Up
          </Link>
          <Link to='log_in' className="item">
            Log In
          </Link>
        </>
      )}
      <div className="ui segment">
        <p></p>
      </div>
    </div>
  );
}
