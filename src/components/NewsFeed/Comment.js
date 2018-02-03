import React from 'react';

import avatarImage from '../../static/images/unknown-user.png'

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <img src={avatarImage} alt="avatar" className="avatar"/>
      <div className="comment-content">
        <strong className="name">{comment.username || 'Guest'}</strong>
        {comment.content}
      </div>
    </div>
  )
}

export default Comment;
