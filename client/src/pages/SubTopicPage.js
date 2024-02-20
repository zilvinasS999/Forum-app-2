import React, { useState, useEffect } from 'react';
import NavbarComp from '../components/NavbarComp';
import SubTopicComp from '../components/SubTopicComp';
import { useAuthStore, useForumStore } from '../store/myStore';
import { useParams } from 'react-router-dom';

function SubTopicPage() {
  const { mainTopicId } = useParams();
  const { token } = useAuthStore();
  const { subtopics, createSubTopic, fetchSubTopics } = useForumStore(
    (state) => ({
      subtopics: state.subtopics,
      createSubTopic: state.createSubTopic,
      fetchSubTopics: state.fetchSubTopics,
    })
  );
  const [subtopicTitle, setSubtopicTitle] = useState('');
  // const [subtopicDescription, setSubtopicDescription] = useState('');

  useEffect(() => {
    if (mainTopicId) {
      fetchSubTopics(mainTopicId, token);
    }
  }, [mainTopicId, token, fetchSubTopics]);

  // || !subtopicDescription.trim()
  const handleCreateDiscussion = async () => {
    if (!subtopicTitle.trim()) {
      alert('Title and description cannot be empty.');
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
      // setSubtopicTitle('');
      // setSubtopicDescription('');
      fetchSubTopics(mainTopicId, token);
    } else {
      alert(result.message || 'Failed to create subtopic. Please try again.');
    }
  };

  return (
    <div>
      <header>
        <NavbarComp />
      </header>
      <main className='subtopic-main'>
        <div className='subtopic-content'>
          <h2>Main Topic: Cars</h2>
          <div>
            {subtopics.map((subtopic) => (
              <SubTopicComp
                key={subtopic._id}
                title={subtopic.title}
                answerCount={subtopic.answerCount}
              />
            ))}
          </div>
          <div className='create-discussion-btn-container'>
            <input
              type='text'
              placeholder='Subtopic Title'
              value={subtopicTitle}
              onChange={(e) => setSubtopicTitle(e.target.value)}
            />
            {/* <textarea
              placeholder='Subtopic Description'
              value={subtopicDescription}
              onChange={(e) => setSubtopicDescription(e.target.value)}
            /> */}
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
