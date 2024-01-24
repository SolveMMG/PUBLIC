import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/Contexts';

const HomePage = () => {
  const { authState } = useAuth();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
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
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    axios.post(`/photos/${photoId}/like`, {}, config)
      .then(response => {
        console.log('Photo liked successfully');
      })
      .catch(error => {
        console.error('Error liking photo:', error);
      });
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', padding: '20px', fontFamily: 'Poppins, sans-serif' }}>
      {photos.map(photo => (
        <div key={photo.id} style={{ width: '300px', margin: '10px', border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden' }}>
          <img src={photo.image_url} alt={photo.title} style={{ width: '100%', height: 'auto', borderRadius: '5px 5px 0 0' }} />
          <div style={{ padding: '15px' }}>
            <h3 style={{ marginTop: '0' }}>{photo.title}</h3>
            <p>{photo.description}</p>
            <Link to={`/photo/${photo.id}`}>
              <button style={{ background: '#4CAF50', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', marginRight: '10px' }}>
                View Information
              </button>
            </Link>
            {authState.isAuthenticated && (
              <button onClick={() => handleLike(photo.id)} class="ui icon red button">
              <i class="heart icon"></i>
             </button>
            )}
          </div>
        </div>
      ))}
    
    </div>
  );
};

export default HomePage;
