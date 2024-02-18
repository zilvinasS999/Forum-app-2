import React from 'react';
import NavbarComp from '../components/NavbarComp';
import MainTopicComp from '../components/MainTopicComp';

function ForumPage() {
  return (
    <div>
      <header>
        <NavbarComp />
      </header>
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
