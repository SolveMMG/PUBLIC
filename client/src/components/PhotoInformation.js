import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PhotoInformation = () => {
  const { photoId } = useParams();
  const [photo, setPhoto] = useState({});
  const [extraInfo, setExtraInfo] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch detailed information about the photo
    axios.get(`/photos/${photoId}`)
      .then(response => {
        setPhoto(response.data);
      })
      .catch(error => {
        setError('Error fetching photo information. Please try again.');
        console.error('PhotoInformation Error:', error);
      });

    // Fetch extra information about the photo (region, create_time, size)
    axios.get(`/photos/${photoId}/extra-info`)
      .then(response => {
        setExtraInfo(response.data.extra_info);
      })
      .catch(error => {
        setError('Error fetching extra photo information. Please try again.');
        console.error('PhotoInformation Extra Info Error:', error);
      });
  }, [photoId]);

  return (
    <div>
      <h1>Photo Information</h1>
      <div>
        <img src={photo.image_url} alt={photo.title} />
        <p>Title: {photo.title}</p>
        <p>Description: {photo.description}</p>
        <p>Region: {extraInfo.region}</p>
        <p>Create Time: {extraInfo.create_time}</p>
        <p>Size: {extraInfo.size}</p>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PhotoInformation;
