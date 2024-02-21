import React from 'react';

function PostsComp({ message }) {
  const renderMedia = () => {
    if (message.imageUrl) {
      return <img src={message.imageUrl} alt='Post' />;
    } else if (message.youtubeUrl) {
      const videoId = new URLSearchParams(
        new URL(message.youtubeUrl).search
      ).get('v');
      return (
        <iframe
          title='YouTube video'
          src={`https://www.youtube.com/embed/${videoId}`}
        />
      );
    }
    return null;
  };
  return (
    <div className='posts-created'>
      <div className='post'>
        <div className='post-content'>{message.content}</div>
        {renderMedia()}
        <div className='post-footer'>
          <span>Posted by: {message.createdBy.username}</span>
          <span>At: {new Date(message.createdAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default PostsComp;
