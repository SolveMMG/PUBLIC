import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/Contexts';

const HomePage = () => {
  const { authState } = useAuth();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Fetch photos from the backend with the access token
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    axios.get('/photos', config)
      .then(response => {
        setPhotos(response.data.photos);
      })
      .catch(error => {
        console.error('Error fetching photos:', error);
      });
  }, []);

  const handleLike = (photoId) => {
    // Handle like logic here
    // Send a request to your backend to add the like for the logged-in user
    // Update the UI accordingly

    // Include the access token in the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    axios.post(`/photos/${photoId}/like`, {}, config)
      .then(response => {
        // Update the UI or perform additional actions if needed
        console.log('Photo liked successfully');
      })
      .catch(error => {
        console.error('Error liking photo:', error);
      });
  };

  return (
    <div>
      <h1>Home</h1>
      {/* Display photos */}
      {photos.map(photo => (
        <div key={photo.id}>
          <img src={photo.image_url} alt={photo.title} />
          <p>{photo.title}</p>
          <p>{photo.description}</p>
          <Link to={`/photo/${photo.id}`}>
            <button>
              View Information
            </button>
          </Link>
          {authState.isAuthenticated && (
            <button onClick={() => handleLike(photo.id)}>
              Like
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
