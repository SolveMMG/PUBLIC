import React, { useState } from 'react';
import axios from 'axios';

const PostPhoto = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handlePostPhoto = () => {
    // Assuming you have an endpoint for creating a photo in the backend
    axios.post('/photos', { title, description }, {}, {headers: {Authorization: `Bearer ${localStorage.getItem('token') }`}})
      .then(response => {
        // Handle successful photo creation, e.g., show a success message
        console.log('Photo created successfully:', response.data.message);
      })
      .catch(error => {
        setError('Error posting photo. Please try again.'); // Handle specific errors based on your backend
        console.error('PostPhoto Error:', error);
      });
  };

  return (
    <div>
      <h1>Post a Photo</h1>
      <form>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handlePostPhoto}>
          Post Photo
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PostPhoto;
