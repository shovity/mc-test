import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchQuestions } from '../../actions/testActions'

class CreateTest extends Component {
  componentDidMount() {
    const fetchQuestions = this.props.fetchQuestions
    fetchQuestions()
  }

  render() {
    return (
      <div>{JSON.stringify(this.props.questions)}</div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    questions: state.test.questions,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuestions: (query) => dispatch(fetchQuestions(query))
  }
}

CreateTest = connect(mapStateToProps, mapDispatchToProps)(CreateTest)

export default CreateTest
