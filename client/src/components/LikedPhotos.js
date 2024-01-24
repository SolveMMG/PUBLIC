import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/Contexts';

const LikedPhotos = () => {
  const { authState } = useAuth();
  const [likedPhotos, setLikedPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authState.isAuthenticated) {
      const currentUserId = authState.user.id;

      // Fetch liked photos for the logged-in user with the access token
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      axios
        .get(`/user/${currentUserId}/liked-photos`, config)
        .then(response => {
          setLikedPhotos(response.data.liked_photos);
          setLoading(false);
        })
        .catch(error => {
          setError('Error fetching liked photos. Please try again.');
          setLoading(false);
          console.error('Error fetching liked photos:', error);
        });
    } else {
      setLoading(false);
    }
  }, [authState]);

  return (
    <div>
      <h1>Liked Photos</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && likedPhotos.length === 0 && <p>No liked photos yet.</p>}
      {/* Display liked photos */}
      {likedPhotos.map(photo => (
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
    </div>
  );
};

export default LikedPhotos;
