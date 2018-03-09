import React from 'react'

import codeParser from '../../utils/codeParser'

const Chat = ({ isOwn, content }) => {
  return (
    <div className={`message ${isOwn? 'own' : ''}`}>
      { codeParser(content) }
    </div>
  )
};

export default Chat;
