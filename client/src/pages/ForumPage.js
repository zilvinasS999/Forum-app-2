import React from 'react';
import NavbarComp from '../components/NavbarComp';
import MainTopicComp from '../components/MainTopicComp';
import { useAuthStore } from '../store/myStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ForumPage() {
  const { isLoggedIn, username } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <header>
        <NavbarComp />
      </header>
      {isLoggedIn && <h1>Welcome, {username}!</h1>}
      <main className='forum-page-main'>
        <div className='main-topic-container'>
          <MainTopicComp />
          <MainTopicComp />
        </div>
        <div className='create-topic-btn-container'>
          <button type='submit'>Create Topic</button>
        </div>
      </main>
    </div>
  );
}

export default ForumPage;
