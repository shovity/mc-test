import React, { Component } from 'react'
import { connect } from 'react-redux'

import CreateTestStep1 from './CreateTestStep1'
import CreateTestStep2 from './CreateTestStep2'
import CreateTestStep3 from './CreateTestStep3'

import { fetchQuestions } from '../../actions/testActions'

import './style.css'
import 'react-select/dist/react-select.css'

class CreateTest extends Component {
  constructor(props) {
    super(props)

    this.state = {
      step: 1,
      test: {},
    }

    this.pickStep = this.pickStep.bind(this)
    this.putTest = this.putTest.bind(this)
  }

  componentDidMount() {
    const fetchQuestions = this.props.fetchQuestions
    fetchQuestions()
  }

  pickStep(step) {
    this.setState({
      step
    })
  }

  putTest(test, replace = false) {
    this.setState({
      test: Object.assign(replace? {} : this.state.test, test)
    })
  }

  renderStep(step) {
    switch (step) {
      case 1:
        return (
          <CreateTestStep1
            pickStep={this.pickStep}
            test={this.state.test}
            putTest={this.putTest}
          />
        )

      case 2:
        return (
          <CreateTestStep2
            pickStep={this.pickStep}
            test={this.state.test}
            putTest={this.putTest}
            questions={this.props.questions}
          />
        )

      case 3:
        return (
          <CreateTestStep3
            pickStep={this.pickStep}
            test={this.state.test}
            putTest={this.putTest}
          />
        )

      default:
        return <div>Unknow step</div>
    }
  }

  render() {
    const { step } = this.state;

    const content = this.renderStep(step)

    return (
      <div id="createTest">
        <div className="process">
          <div className={`step ${step===1? 'active' : step>1? 'final' : ''}`}><div className="core">1</div></div>
          <div className={`step ${step===2? 'active' : step>2? 'final' : ''}`}><div className="core">2</div></div>
          <div className={`step ${step===3? 'active' : step>3? 'final' : ''}`}><div className="core">3</div></div>
        </div>

        <div className="content">
          {content}
        </div>
      </div>
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
