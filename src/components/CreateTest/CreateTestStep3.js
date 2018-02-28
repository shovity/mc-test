import React, { Component } from 'react'
import { connect } from 'react-redux'

import { requestPostTest } from '../../actions/testActions'
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
    const rawTest = this.props.test
    const questions = this.props.questions

    const test = {
      ...rawTest,
      time: rawTest.time * 60,
      quests: rawTest.questions
    }

    delete test.questions
    delete test._id
    delete test.size

    this.props.requestPostTest(test)
  }

  copyCode() {
    this.refs.inputTestCode.select()
    document.execCommand("Copy")
    this.props.pushAlert('Test code copied!', 'success')
  }

  render() {
    return (
      <div>
        <h1>Test review</h1>

        <div style={{ wordWrap: 'break-word' }}>{ JSON.stringify(this.props.test) }</div>

        <h2>Post test result</h2>
        { JSON.stringify(this.props.postTestResutl || {}) }

        { this.props.postTestResutl._id &&
          <div>
            <label>Test code embed</label>
            <input type="text" ref="inputTestCode" value={`[test:${this.props.postTestResutl._id}]`} readOnly/>
            <button className="btn btn-small" onClick={this.copyCode.bind(this)}>copy code</button>
          </div>
        }

        <div className="tac">
          <button className="btn" onClick={() => this.props.pickStep(2)}>Prev</button>
          <button className="btn btn-success" onClick={this.handlePostTest.bind(this)}>Post</button>
          <button className="btn btn-primary">Cancel</button>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    postTestResutl: state.test.postTestResutl,
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
