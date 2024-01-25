import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Posted = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const currentUserId = JSON.parse(atob(token.split('.')[1])).sub;
      const url = `/user/${currentUserId}/posts`;

      fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        setUserPosts(data.user_posts);
      })
      .catch(error => {
        setError('Error fetching user posts. Please try again.');
        console.error('Posted Error:', error);
      });
    }
  }, []);

  const handleDelete = (photoId) => {
    const token = localStorage.getItem('token');
    const url = `/photos/${photoId}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      // Update userPosts after successful deletion
      setUserPosts(prevPosts => prevPosts.filter(post => post.id !== photoId));
    })
    .catch(error => {
      console.error('Delete Error:', error);
    });
  };

  return (
    <div>
      <h1>Posted Photos</h1>
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
          {/* Add delete button */}
          <button onClick={() => handleDelete(photo.id)}>Delete</button>
        </div>
      ))}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Posted;
