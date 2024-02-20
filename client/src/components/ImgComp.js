import React from 'react';
import { useProfileStore } from '../store/myStore';
import { useState, useEffect } from 'react';

function ImgComp({ userId }) {
  const { userProfile, updateUserImage } = useProfileStore();
  const [newImageUrl, setNewImageUrl] = useState('');

  // useEffect(() => {
  //   if (userProfile && userProfile.image) {
  //     setNewImageUrl(userProfile.image);
  //   }
  // }, [userProfile]);

  const handleImageUpdate = () => {
    const token = localStorage.getItem('token');

    if (token && newImageUrl && newImageUrl !== userProfile.image) {
      updateUserImage(newImageUrl, token);
    }
  };

  return (
    <div className='profile-img-card col-4'>
      <img
        src={
          userProfile.image ||
          'https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png'
        }
        alt='Profile'
        className='profile-img'
      />
      <input
        type='text'
        className='img-url'
        value={newImageUrl}
        onChange={(e) => setNewImageUrl(e.target.value)}
      />
      <button type='button' onClick={handleImageUpdate}>
        Update Image
      </button>
    </div>
  );
}

export default ImgComp;
