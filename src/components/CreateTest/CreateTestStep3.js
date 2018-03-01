import React, { Component } from 'react'
import { connect } from 'react-redux'

import { requestPostTest } from '../../actions/testActions.js'
import { pushAlert } from '../../actions/statusActions'

class CreateTestStep3 extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  componentDidMount() {
    // this.props.requestPostQuestion(this.props.question)
  }

  handlePostTest() {
    const rawTest = JSON.parse(JSON.stringify(this.props.test))
    const questions = this.props.questions

    const test = {
      ...rawTest,
      time: rawTest.time * 60,
      quests: rawTest.questions,
      des: this.refs.des.value,
    }

    delete test.questions
    delete test._id
    delete test.size

    test.quests.forEach(q => {
      delete q._id
    })

    this.props.requestPostTest(test)
  }

  copyCode() {
    this.refs.inputTestCode.select()
    document.execCommand("Copy")
    this.props.pushAlert('Test code copied!', 'success')
  }

  handleStartOver() {
    this.props.putTest({}, true)
    this.props.pickStep(1)
  }

  render() {
    const { test, username } = this.props
    console.log(test)
    const testInfo = test && (
      <div className="test-info">
        <div><span>Title</span> {test.title || ''}</div>
        <div><span>Subject</span> {test.subject || ''}</div>
        <div><span>Total times</span> {test.time || ''}</div>
        <div><span>Number of question</span> {test.questions.length}</div>
        <div><span>Sum level</span> {test.questions.reduce((a, b) => +a.level+b.level, 0)}</div>
        <div><span>Author</span> {username}</div>
      </div>
    )

    return (
      <div>
        <h2>Review</h2>
        { testInfo }

        <h2>Post test result</h2>
        { JSON.stringify(this.props.postTestResutl || {}) }

        { this.props.postTestResutl._id &&
          <div>
            <label>Test code embed</label>
            <input type="text" ref="inputTestCode" value={`[test:${this.props.postTestResutl._id}]`} readOnly/>
            <button className="btn btn-small" onClick={this.copyCode.bind(this)}>copy code</button>
          </div>
        }

        <label>Descriptions <span className="hint">option</span></label>
        <textarea className="input-content" ref="des" placeholder="input descriptions ..."></textarea>

        <div className="tac">
          <button className="btn" onClick={() => this.props.pickStep(2)}>Prev</button>
          <button className="btn btn-success" onClick={this.handlePostTest.bind(this)}>Post</button>
          <button className="btn btn-primary" onClick={this.handleStartOver.bind(this)}>Start over</button>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    postTestResutl: state.test.postTestResutl,
    username: state.auth.username,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestPostTest: (test) => dispatch(requestPostTest(test)),
    pushAlert: (message, type, time) => dispatch(pushAlert(message, type, time)),
  }
}

CreateTestStep3 = connect(mapStateToProps, mapDispatchToProps)(CreateTestStep3)

export default CreateTestStep3
