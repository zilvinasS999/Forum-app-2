import React, { useState, useEffect } from 'react';
import NavbarComp from '../components/NavbarComp';
import SubTopicComp from '../components/SubTopicComp';
import { useAuthStore, useForumStore } from '../store/myStore';
import { useParams } from 'react-router-dom';

function SubTopicPage() {
  const { mainTopicId } = useParams();
  const { token } = useAuthStore();
  const {
    subtopics,
    createSubTopic,
    fetchSubTopics,
    mainTopicTitle,
    fetchMainTopicTitle,
  } = useForumStore((state) => ({
    subtopics: state.subtopics,
    createSubTopic: state.createSubTopic,
    fetchSubTopics: state.fetchSubTopics,
    mainTopicTitle: state.mainTopicTitle,
    fetchMainTopicTitle: state.fetchMainTopicTitle,
  }));
  const [subtopicTitle, setSubtopicTitle] = useState('');

  useEffect(() => {
    if (mainTopicId && token) {
      console.log('Requesting main topic with ID:', mainTopicId); // Log the ID being passed
      fetchSubTopics(mainTopicId, token);
      fetchMainTopicTitle(mainTopicId, token);
    }
  }, [mainTopicId, token, fetchSubTopics, fetchMainTopicTitle]);

  const handleCreateDiscussion = async () => {
    if (!subtopicTitle.trim()) {
      alert('Title cannot be empty.');
      return;
    }

    const result = await createSubTopic(
      {
        title: subtopicTitle,
      },
      mainTopicId,
      token
    );

    if (result.success) {
      setSubtopicTitle('');
      fetchSubTopics(mainTopicId, token);
    } else {
      alert(result.message || 'Failed to create subtopic. Please try again.');
    }
  };
  console.log('Current main topic title state:', mainTopicTitle);
  return (
    <div>
      <header>
        <NavbarComp />
      </header>
      <main className='subtopic-main'>
        <div className='subtopic-content'>
          <h2>Main Topic: {mainTopicTitle || 'Loading...'}</h2>
          <div>
            {subtopics && subtopics.length > 0 ? (
              subtopics.map((subtopic) => (
                <SubTopicComp
                  key={subtopic._id}
                  title={subtopic.title}
                  answerCount={subtopic.answerCount || 0}
                />
              ))
            ) : (
              <p>No subtopics found or still loading...</p>
            )}
          </div>
          <div className='create-discussion-btn-container'>
            <input
              type='text'
              placeholder='Subtopic Title'
              value={subtopicTitle}
              onChange={(e) => setSubtopicTitle(e.target.value)}
            />
            <button
              type='button'
              className='create-discussion-btn'
              onClick={handleCreateDiscussion}
            >
              Create Discussion
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SubTopicPage;
