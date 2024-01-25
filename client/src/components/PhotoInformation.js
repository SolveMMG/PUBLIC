import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Image, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

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
    <Container style={{ marginTop: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontWeight: 'bold' }}>Photo Information</h1>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Image src={photo.image_url} alt={photo.title} size='large' rounded style={{ marginBottom: '10px', borderRadius: '15px' }} />
        <p style={{ fontWeight: 'bold' }}><strong>Title:</strong> {photo.title}</p>
        <p style={{ fontWeight: 'bold' }}><strong>Description:</strong> {photo.description}</p>
      </div>

      {error && <Message negative>{error}</Message>}
    </Container>
  );
};

export default PhotoInformation;
