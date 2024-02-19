import React from 'react';
import { useProfileStore } from '../store/myStore';

function ImgComp() {
  const { userProfile, fetchUserProfile } = useProfileStore();
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
      <input type='text' className='img-url' />
      <button type='submit'>Update Image</button>
    </div>
  );
}

export default ImgComp;
