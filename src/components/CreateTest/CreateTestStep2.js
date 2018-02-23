import React, { Component } from 'react'
import Select from 'react-select'

class CreateTestStep2 extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }


  handleNextStep() {

  }

  render() {
    const { test, questions } = this.props


    return (
      <div>
        { JSON.stringify(questions)}
        <button className="btn" onClick={() => this.props.pickStep(1)}>Prev</button>
        <button className="btn btn-primary" onClick={this.handleNextStep.bind(this)}>Next</button>
      </div>
    )
  }

}

export default CreateTestStep2
