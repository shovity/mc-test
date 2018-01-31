import React from 'react'

const Answer = ({ answer, isFocus, isChoice, click }) => (
  <div onClick={() => click(answer.label)} className={`answer ${isChoice? 'choice' : isFocus? 'focus' : ''}`}>
    <div className="answer-label">{answer.label}</div>
    <div className="answer-content">
      {answer.content}
    </div>
  </div>
)

export default Answer
