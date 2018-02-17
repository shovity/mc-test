import React from 'react';

const Comment = ({ comment, my_avatar, my_username, avatar_base }) => {
  const avatar = my_username===comment.username? my_avatar : avatar_base + comment.username
  return (
    <div className="comment">
      <img src={avatar} alt="" className="avatar"/>
      <div className="comment-content">
        <strong className="name">{comment.username || 'Guest'}</strong>
        {comment.content}
      </div>
    </div>
  )
}

export default Comment;
