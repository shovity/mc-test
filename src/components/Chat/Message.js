import React from 'react';

const Chat = ({ isOwn, content }) => {
  return (
    <div className={`message ${isOwn? 'own' : ''}`}>
      { content }
    </div>
  )
};

export default Chat;
