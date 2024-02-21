import React from 'react';

function TopicsComp({ topics }) {
  return (
    <div className='topics-created'>
      {topics && topics.length > 0 ? (
        topics.map((topic, index) => (
          <div key={index} className='profile-topics'>
            <h5 className='profile-topics'>{topic.title}</h5>
          </div>
        ))
      ) : (
        <p>No topics created.</p>
      )}
    </div>
  );
}

export default TopicsComp;
