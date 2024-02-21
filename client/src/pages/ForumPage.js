import React, { useEffect, useState } from 'react';
import NavbarComp from '../components/NavbarComp';
import MainTopicComp from '../components/MainTopicComp';
import { useAuthStore, useForumStore } from '../store/myStore';
import { useNavigate } from 'react-router-dom';

function ForumPage() {
  const { token, isLoggedIn, role, username, setRole } = useAuthStore(
    (state) => ({
      token: state.token,
      isLoggedIn: state.isLoggedIn,
      role: state.role,
      username: state.username,
      setRole: state.setRole,
    })
  );
  const { topics, fetchTopics, createTopic } = useForumStore((state) => ({
    topics: state.topics,
    fetchTopics: state.fetchTopics,
    createTopic: state.createTopic,
  }));

  const navigate = useNavigate();
  const [topicTitle, setTopicTitle] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      const storedRole = localStorage.getItem('role');
      if (storedRole && role !== storedRole) {
        setRole(storedRole);
      }
      fetchTopics();
    }
  }, [isLoggedIn, navigate, fetchTopics, setRole]);
  const handleCreateTopicClick = async () => {
    if (role !== 'admin') {
      alert('Only admins can create topics.');
      return;
    }

    if (!topicTitle.trim()) {
      alert('Please enter a title for the topic.');
      return;
    }
    try {
      const result = await createTopic({ title: topicTitle }, token);
      if (result.success) {
        setTopicTitle('');
        await fetchTopics();
      } else {
        alert('Failed to create topic. Please try again.');
      }
    } catch (error) {
      console.error('Error creating topic:', error);
      alert('An error occurred while creating the topic. Please try again.');
    }
  };
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
            <input
              type='text'
              placeholder='Enter topic title'
              value={topicTitle}
              onChange={(e) => setTopicTitle(e.target.value)}
            />
            <button type='button' onClick={handleCreateTopicClick}>
              Create Topic
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
export default ForumPage;
