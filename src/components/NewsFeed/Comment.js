import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <img src="/images/unknown-user.png" alt="avatar" className="avatar"/>
      <div className="comment-content">
        <strong className="name">{comment.username || 'Guest'}</strong>
        <pre>{comment.content}</pre>
      </div>
    </div>
  )
}

export default Comment;
