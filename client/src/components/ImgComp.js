import React from 'react';

function ImgComp() {
  return (
    <div className='profile-img-card col-4'>
      <img src='' alt='' className='profile-img' />
      <input type='text' className='img-url' />
      <button type='submit'>Update Image</button>
    </div>
  );
}

export default ImgComp;
