import React, { Component } from 'react'
import { connect } from 'react-redux'

import { requestPostTest } from '../../actions/testActions.js'
import { pushAlert } from '../../actions/statusActions'

import { parseTime } from '../../utils/time'

class CreateTestStep3 extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  handlePostTest() {
    const rawTest = JSON.parse(JSON.stringify(this.props.test))

    const test = {
      ...rawTest,
      time: rawTest.time * 60,
      quests: rawTest.questions,
      descriptions: this.refs.des.value,
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
    const testInfo = test && (
      <div className="test-info">
        <div><span>Title</span> {test.title || ''}</div>
        <div><span>Subject</span> {test.subject || ''}</div>
        <div><span>Total times</span> {parseTime(test.time*60 || 0)}</div>
        <div><span>Number of question</span> {test.questions.length}</div>
        <div><span>Level</span> {test.questions.reduce((a, b) => a+ +b.level, 0)}</div>
        <div><span>Author</span> {username}</div>
      </div>
    )

    return (
      <div>
        <h2>Review</h2>
        { testInfo }

        <label>Descriptions <span className="hint">option</span></label>
        <textarea className="input-content" ref="des" placeholder="input descriptions ..."></textarea>

        { this.props.postTestResutl._id &&
          <div>
            <h2>Post test success</h2>
            <label>Test code embed</label>
            <input type="text" ref="inputTestCode" value={`[test:${this.props.postTestResutl._id}]`} readOnly/>
            <button className="btn btn-small" onClick={this.copyCode.bind(this)}>copy code</button>
          </div>
        }



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
