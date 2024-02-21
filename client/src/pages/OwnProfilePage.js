import React, { useEffect } from 'react';
import NavbarComp from '../components/NavbarComp';
import ImgComp from '../components/ImgComp';
import TopicsComp from '../components/TopicsComp';
import PostsComp from '../components/PostsComp';
import { useProfileStore } from '../store/myStore';
import { useParams } from 'react-router-dom';

function OwnProfilePage() {
  const { userId } = useParams();
  const { userProfile, fetchUserProfile } = useProfileStore();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (userId && token) {
      fetchUserProfile(userId, token);
    }
  }, [userId, fetchUserProfile]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header className='profile-page-header'>
        <NavbarComp />
      </header>
      <main className='profile-page-main'>
        <ImgComp image={userProfile.image} userId={userId} />
        <div className='main-right'>
          <h2 className='username'>{userProfile.username}</h2>
          <h4>Topics created in forum</h4>
          <TopicsComp topics={userProfile.topics} />
          <h4>Posts written in forum</h4>
          {/* <PostsComp posts={userProfile.posts} /> */}
        </div>
      </main>
    </div>
  );
}

export default OwnProfilePage;
