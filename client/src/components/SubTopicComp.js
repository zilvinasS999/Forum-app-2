import React from 'react';

function SubTopicComp({ title, answerCount }) {
  return (
    <div className='subtopic-box'>
      <h3>{title}</h3>
      <h3>Answers: {answerCount}</h3>
    </div>
  );
}

export default SubTopicComp;
