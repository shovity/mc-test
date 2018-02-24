import React, { Component } from 'react'
import { connect } from 'react-redux'

import { requestPostTest } from '../../actions/testActions'

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
      quests: questions.filter(q => this.props.test.questions.indexOf(q._id) !== -1)
    }

    console.log(test)
    this.props.requestPostTest(test)
  }

  render() {
    return (
      <div>
        <h1>Test review</h1>
        <div style={{ wordWrap: 'break-word' }}>{ JSON.stringify(this.props.test) }</div>

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
    // postQuestionRedult: state.test.postQuestionRedult,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestPostTest: (test) => dispatch(requestPostTest(test)),
  }
}

CreateTestStep3 = connect(mapStateToProps, mapDispatchToProps)(CreateTestStep3)

export default CreateTestStep3
