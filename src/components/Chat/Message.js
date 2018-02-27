import React from 'react'

import codeParser from '../../codeParser'

const Chat = ({ isOwn, content }) => {
  return (
    <div className={`message ${isOwn? 'own' : ''}`}>
      { codeParser(content) }
    </div>
  )
};

export default Chat;
