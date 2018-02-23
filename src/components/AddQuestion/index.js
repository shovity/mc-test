import React, { Component } from 'react'

import AddQuestionStep1 from './AddQuestionStep1'
import AddQuestionStep2 from './AddQuestionStep2'
import AddQuestionStep3 from './AddQuestionStep3'

import './style.css'
import 'react-select/dist/react-select.css'

class AddQuestion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      step: 1,
      question: {},
    }

    this.pickStep = this.pickStep.bind(this)
    this.putQuestion = this.putQuestion.bind(this)
  }

  pickStep(step) {
    this.setState({
      step
    })
  }

  putQuestion(question, replace = false) {
    this.setState({
      question: Object.assign(replace? {} : this.state.question, question)
    })
  }

  renderStep(step) {
    switch (step) {
      case 1:
        return (
          <AddQuestionStep1
            pickStep={this.pickStep}
            question={this.state.question}
            putQuestion={this.putQuestion}
          />
        )

      case 2:
        return (
          <AddQuestionStep2
            pickStep={this.pickStep}
            question={this.state.question}
            putQuestion={this.putQuestion}
          />
        )

      case 3:
        return (
          <AddQuestionStep3
            pickStep={this.pickStep}
            question={this.state.question}
            putQuestion={this.putQuestion}
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
      <div id="addQuestion">
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

export default AddQuestion
