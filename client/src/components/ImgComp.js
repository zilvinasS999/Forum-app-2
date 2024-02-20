import React from 'react';
import NavbarComp from '../components/NavbarComp';
import MainTopicComp from '../components/MainTopicComp';
import { useAuthStore, useForumStore } from '../store/myStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ForumPage() {
  const { isLoggedIn, username, role } = useAuthStore();
  const { topics, fetchTopics } = useForumStore();

  const navigate = useNavigate();
  console.log('Topics state:', topics);
  console.log('Topics Topics:', topics.topics);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      fetchTopics();
    }
  }, [isLoggedIn, navigate, fetchTopics]);

  console.log('Logged in as:', username);
  // if (!Array.isArray(topics)) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <header>
        <NavbarComp />
      </header>
      {isLoggedIn && <h1>Welcome, {username}!</h1>}
      <main className='forum-page-main'>
        <div className='main-topic-container'>
          {topics.topics &&
            topics.topics.map((topic) => (
              <MainTopicComp
                key={topic._id}
                title={topic.title}
                count={topic.count || 0}
              />
            ))}
        </div>
        {role === 'admin' && (
          <div className='create-topic-btn-container'>
            <button type='button'>Create Topic</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default ForumPage;
