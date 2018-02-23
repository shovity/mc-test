import React, { Component } from 'react'
import { connect } from 'react-redux'

import { requestPostQuestion } from '../../actions/testActions'

class AddQuestionStep3 extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  componentDidMount() {
    this.props.requestPostQuestion(this.props.question)
  }

  handleDone() {
    const { putQuestion, pickStep } = this.props
    putQuestion({}, true)
    pickStep(1)
  }

  render() {
    const { question, postQuestionRedult } = this.props

    if (!postQuestionRedult.id) return <div>Posting question...</div>

    return (
      <div>
      <p className="title">{question.content}</p>

      <div className="ra">
        <div className="c1">
          <div className="answer">
            <div className="answer-label">A</div>
            <div className="answer-content">
              {question.answers.find(a => a.label === 'A').content}
            </div>
          </div>
          <div className="answer">
            <div className="answer-label">B</div>
            <div className="answer-content">
              {question.answers.find(a => a.label === 'B').content}
            </div>
          </div>
        </div>

        <div className="c2">
          <div className="answer">
            <div className="answer-label">C</div>
            <div className="answer-content">
              {question.answers.find(a => a.label === 'C').content}
            </div>
          </div>
          <div className="answer">
            <div className="answer-label">D</div>
            <div className="answer-content">
              {question.answers.find(a => a.label === 'D').content}
            </div>
          </div>
        </div>
      </div>

        <p>
          Subject: {question.subject} <br/>
          Tags: {question.tags.join(', ')} <br/>
          Level: {question.level} <br/>
          True answer: {question.true_answer} <br/>
        </p>

        <p>
          Onwer: {postQuestionRedult.onwer} <br/>
          ID: {postQuestionRedult.id}
        </p>

        <div className="tac">
          <button className="btn" onClick={this.handleDone.bind(this)}>Add more</button>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    postQuestionRedult: state.test.postQuestionRedult,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestPostQuestion: (question) => dispatch(requestPostQuestion(question)),
  }
}

AddQuestionStep3 = connect(mapStateToProps, mapDispatchToProps)(AddQuestionStep3)

export default AddQuestionStep3
