import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/Contexts';

const LikePhotos = () => {
  const [likedPhotos, setLikedPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { dispatch } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.log("User not authenticated");
          setLoading(false);
          return;
        }

        // Parse the token (assuming it's a JWT) to get user ID
        const [, payloadBase64] = token.split('.');
        const payload = JSON.parse(atob(payloadBase64));
        
        console.log('Decoded payload:', payload); // Add this line for debugging
        
        const currentUserId = payload.sub; // Use the correct field for user ID

        console.log('Current user ID:', currentUserId); // Add this line for debugging

        const response = await axios.get(`/user/${currentUserId}/liked-photos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setLikedPhotos(response.data.liked_photos);
        setLoading(false);
      } catch (error) {
        setError('Error fetching liked photos. Please try again.');
        setLoading(false);
        console.error('Error fetching liked photos:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleUnlike = async (photoId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/photos/${photoId}/like`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the unliked photo from the state
      setLikedPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== photoId));
    } catch (error) {
      console.error('Error unliking photo:', error);
    }
  };

  return (
    <div  >
      <h1 >Liked Photos</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && likedPhotos.length === 0 && (
        <p>No liked photos available.</p>
      )}
      {!loading && !error && likedPhotos.length > 0 && (
        <div class="ui grid" >
          <div class="four wide column">
          <ul>
            {likedPhotos.map((photo) => (
              <div class="ui card">
              <li key={photo.id}>
                <img class="image" src={photo.image_url} alt={photo.title} />
                <p>Title: {photo.title}</p>
                <p>Description: {photo.description}</p>
                {/* Add unlike button */}
                <button onClick={() => handleUnlike(photo.id)}>Unlike</button>
              </li>
              </div>
            ))}
          </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LikePhotos;
