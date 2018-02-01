import React from 'react';

const Chat = ({ isOwn, content }) => {
  console.log(isOwn)
  return (
    <div className={`message ${isOwn? 'own' : ''}`}>
      <pre>{ content }</pre>
    </div>
  )
};

export default Chat;
