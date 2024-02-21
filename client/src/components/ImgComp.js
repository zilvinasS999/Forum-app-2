import React, { useState } from 'react';
import { useProfileStore } from '../store/myStore';

const ImgComp = ({ image, userId }) => {
  const [newImageUrl, setNewImageUrl] = useState('');
  const { updateUserImage } = useProfileStore();

  const handleImageUpdate = async () => {
    const token = localStorage.getItem('token');
    if (newImageUrl.trim() && token) {
      await updateUserImage(newImageUrl, token);
      setNewImageUrl('');
      alert('Please enter a valid image URL.');
    }
  };

  return (
    <div className='profile-card'>
      <img
        src={image || 'default-image-url.png'}
        alt='Profile'
        className='profile-img'
      />
      <input
        type='text'
        value={newImageUrl}
        onChange={(e) => setNewImageUrl(e.target.value)}
        placeholder='Enter new image URL'
      />
      <button onClick={handleImageUpdate}>Update image</button>
    </div>
  );
};

export default ImgComp;
