import React from 'react';
import NavbarComp from '../components/NavbarComp';
import SubTopicComp from '../components/SubTopicComp';

import { useAuthStore, useForumStore } from '../store/myStore';
import { useParams } from 'react-router-dom';

function SubTopicPage() {
  const { mainTopicId } = useParams();
  const { token } = useAuthStore();
  const {
    subtopics,
    subtopicTitle,
    subtopicDescription,
    setSubtopicTitle,
    setSubtopicDescription,
    createSubTopic,
    fetchSubTopics,
    mainTopicTitle,
    fetchMainTopicTitle,
  } = useForumStore();

  React.useEffect(() => {
    if (mainTopicId && token) {
      fetchSubTopics(mainTopicId, token);
      fetchMainTopicTitle(mainTopicId, token);
    }
  }, [mainTopicId, token, fetchSubTopics, fetchMainTopicTitle]);

  const handleCreateDiscussion = async () => {
    if (!subtopicTitle.trim() || !subtopicDescription.trim()) {
      alert('Both title and description cannot be empty.');
      return;
    }

    const result = await createSubTopic(mainTopicId, token);
    if (result.success) {
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
        <h2>Main Topic: {mainTopicTitle || 'Loading...'}</h2>
        {subtopics && subtopics.length > 0 ? (
          subtopics.map((subtopic, index) =>
            subtopic && subtopic.title ? (
              <SubTopicComp
                key={subtopic._id || index} // fallback to index if _id is not available
                title={subtopic.title}
                answerCount={subtopic.answerCount || 0}
              />
            ) : null // or you can handle the undefined subtopic case differently
          )
        ) : (
          <p>No subtopics found or still loading...</p>
        )}
        <input
          type='text'
          placeholder='Subtopic Title'
          value={subtopicTitle}
          onChange={(e) => setSubtopicTitle(e.target.value)}
        />
        <textarea
          placeholder='Subtopic Description'
          value={subtopicDescription}
          onChange={(e) => setSubtopicDescription(e.target.value)}
        />
        <button onClick={handleCreateDiscussion}>Create Discussion</button>
      </main>
    </div>
  );
}

export default SubTopicPage;
