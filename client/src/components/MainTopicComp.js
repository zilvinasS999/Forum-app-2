import React from 'react';

function MainTopicComp({ title, count }) {
  return (
    <div className='main-topic'>
      <h2>{title}</h2>
      <h5>Topics amount: {count}</h5>
    </div>
  );
}

export default MainTopicComp;
