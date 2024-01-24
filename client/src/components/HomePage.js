import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/Contexts';
import { Button, Grid, Header, Segment } from 'semantic-ui-react';

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
              <button onClick={() => handleLike(photo.id)} style={{ background: '#2196F3', color: 'white', border: 'none', padding: '10px', borderRadius: '5px' }}>
                Like
              </button>
            )}
          </div>
        </div>
      ))}
      {/* Footer */}
      <Segment inverted vertical style={{ width: '100%', textAlign: 'center', marginTop: '20px', padding: '30px', backgroundColor: '#282c34' }}>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header inverted as='h3'>About Us</Header>
              <p>
                Snapstore is your premier destination for high-quality photography. Our team of photographers and artists is passionate about delivering stunning visuals that resonate with your audience.
              </p>
              <Link to="/about-us">
                <Button color='green'>Learn More</Button>
              </Link>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header inverted as='h3'>Contact Us</Header>
              <p>Email: moringaGroup6@photostore.com</p>
              <p>Phone: 0790224262</p>
              <Link to="/contact-form">
                <Button color='blue'>Contact Form</Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#a0a0a0' }}>&copy; 2024 PHOTOSTORE. All rights reserved.</p>
      </Segment>
    </div>
  );
};

export default HomePage;
