import React from 'react';
import NavbarComp from '../components/NavbarComp';
import ImgComp from '../components/ImgComp';
import TopicsComp from '../components/TopicsComp';
import PostsComp from '../components/PostsComp';

function OwnProfilePage() {
  return (
    <div>
      <header className='profile-page-header'>
        <NavbarComp />
      </header>
      <main className='profile-page-main'>
        <ImgComp />
        <div className='main-right'>
          <h2 className='username'>USERNAME</h2>
          <h4>Topics created in forum</h4>
          <TopicsComp />
          <h4>Posts written in forum</h4>
          <PostsComp />
        </div>
      </main>
    </div>
  );
}

export default OwnProfilePage;
