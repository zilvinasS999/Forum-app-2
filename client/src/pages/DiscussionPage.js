import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavbarComp from '../components/NavbarComp';
import PostsComp from '../components/PostsComp';
import {
  useAuthStore,
  useForumStore,
  useMessageStore,
  useProfileStore,
} from '../store/myStore';

function DiscussionPage() {
  const { discussionId, mainTopicId } = useParams();
  const { token } = useAuthStore();
  const { fetchMessages, messages, sendMessage } = useMessageStore();
  const { fetchUserProfile, userProfile } = useProfileStore();
  const { fetchSubTopic, subtopic } = useForumStore();
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (discussionId && token) {
      fetchMessages(discussionId, token);
    }
    if (mainTopicId && token) {
      fetchSubTopic(mainTopicId, token);
    }
  }, [discussionId, mainTopicId, token, fetchMessages, fetchSubTopic]);

  useEffect(() => {
    if (subtopic && subtopic.createdBy && token) {
      fetchUserProfile(subtopic.createdBy, token);
    }
  }, [subtopic, token, fetchUserProfile]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      alert('Message cannot be empty.');
      return;
    }
    await sendMessage(discussionId, newMessage, token);
    setNewMessage('');
  };

  return (
    <div>
      <NavbarComp />
      <main className='discussion-page'>
        {subtopic ? (
          <section className='subtopic-info'>
            <h2>{subtopic.title || 'Loading subtopic...'}</h2>
            <p>{subtopic.description || 'No description available.'}</p>
          </section>
        ) : (
          <p>Loading subtopic information...</p>
        )}

        {userProfile ? (
          <section className='user-profile-info'>{/* ... */}</section>
        ) : (
          <p>Loading user profile...</p>
        )}

        <h1>Discussion</h1>
        {messages &&
          messages.map((message) => (
            <PostsComp key={message._id} message={message} />
          ))}
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder='Type your message here...'
        />
        <button onClick={handleSendMessage}>Send</button>
      </main>
    </div>
  );
}

export default DiscussionPage;
