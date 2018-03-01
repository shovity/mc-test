import React, { Component } from 'react'

class AddQuestionStep1 extends Component {

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('component will update')
  }

  handleNextStep() {
    const { pickStep, putQuestion } = this.props
    const { content, a, b, c, d } = this.refs

    putQuestion({
      content: content.value,
      answers: [
        { label: 'A', content: a.value },
        { label: 'B', content: b.value },
        { label: 'C', content: c.value },
        { label: 'D', content: d.value },
      ]
    })
    pickStep(2)
  }

  render() {
    // const { question } = this.props
    return (
      <div>
        <h1>Input content</h1>
        <label>Questions content</label>
        <textarea className="input-content" ref="content" placeholder="input content of question"></textarea>

        <label>Answer A</label>
        <input type="text" ref="a" placeholder="input content of answer a ..."/>
        <label>Answer B</label>
        <input type="text" ref="b" placeholder="input content of answer b ..."/>
        <label>Answer C</label>
        <input type="text" ref="c" placeholder="input content of answer c ..."/>
        <label>Answer D</label>
        <input type="text" ref="d" placeholder="input content of answer d ..."/>

        <div className="tac">
          <button className="btn btn-primary" onClick={this.handleNextStep.bind(this)}>Next</button>
        </div>
      </div>
    )
  }

}

export default AddQuestionStep1
