import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Posted = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch photos posted by the logged-in user
    axios.get('/user/posts') // Adjust the endpoint based on your backend
      .then(response => {
        setUserPosts(response.data.user_posts);
      })
      .catch(error => {
        setError('Error fetching user posts. Please try again.');
        console.error('Posted Error:', error);
      });
  }, []);

  return (
    <div>
      <h1>Posted Photos</h1>
      {/* Display photos posted by the logged-in user */}
      {userPosts.map(photo => (
        <div key={photo.id}>
          <img src={photo.image_url} alt={photo.title} />
          <p>{photo.title}</p>
          <p>{photo.description}</p>
          <Link to={`/photo/${photo.id}`}>
            <button>
              View Information
            </button>
          </Link>
        </div>
      ))}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Posted;
