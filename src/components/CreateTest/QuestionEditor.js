import React from 'react'

const QuestionEditor = ({ question, index, removeQuestion, showEditorModal }) => {
  if (!question.content) return <div>props question invalid</div>
  return (
    <div className="question-editor">
      <div className="controls-bar">
        <i className="fa fa-edit controls-bar-btn" onClick={showEditorModal}></i>
        <i className="fa fa-times controls-bar-btn" onClick={() => removeQuestion(question._id)}></i>
      </div>
      <p className="title">
        <strong>Question {index+1}</strong>: {question.content}
      </p>

      <div className="ra">
        <div className="c1">
          <div className={`answer ${question.true_answer.toLowerCase() === 'a'? 'true' : ''}`}>
            <div className="answer-label">A</div>
            <div className="answer-content">
              {question.answers.find(a => a.label.toLowerCase() === 'a').content}
            </div>
          </div>
          <div className={`answer ${question.true_answer.toLowerCase() === 'b'? 'true' : ''}`}>
            <div className="answer-label">B</div>
            <div className="answer-content">
              {question.answers.find(a => a.label.toLowerCase() === 'b').content}
            </div>
          </div>
        </div>

        <div className="c2">
          <div className={`answer ${question.true_answer.toLowerCase() === 'c'? 'true' : ''}`}>
            <div className="answer-label">C</div>
            <div className="answer-content">
              {question.answers.find(a => a.label.toLowerCase() === 'c').content}
            </div>
          </div>
          <div className={`answer ${question.true_answer.toLowerCase() === 'd'? 'true' : ''}`}>
            <div className="answer-label">D</div>
            <div className="answer-content">
              {question.answers.find(a => a.label.toLowerCase() === 'd').content}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionEditor
