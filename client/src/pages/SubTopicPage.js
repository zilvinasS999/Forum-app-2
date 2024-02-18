import React from 'react';
import NavbarComp from '../components/NavbarComp';
import SubTopicComp from '../components/SubTopicComp';

function SubTopicPage() {
  return (
    <div>
      <header>
        <NavbarComp />
      </header>
      <main className='subtopic-main'>
        <div className='subtopic-content'>
          <h2>Main Topic: Cars</h2>
          <div>
            <SubTopicComp />
            <SubTopicComp />
          </div>
          <div className='create-discussion-btn-container'>
            <button type='submit' className='create-discussion-btn'>
              Create Discussion
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SubTopicPage;
