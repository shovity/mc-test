import React, { Component } from 'react'
import { connect } from 'react-redux'

import Answer from './Answer'
import './style.css'

class Test extends Component {

  constructor(props) {
    super(props)

    this.state = {
      focus: '',
      choice: ''
    }

    this.handleClickAnswer = this.handleClickAnswer.bind(this)
  }

  handleClickAnswer(label) {
    // was done
    if (this.state.choice !== '') return

    if (this.state.focus !== label) {
      this.setState({ focus: label })
    } else {
      this.setState({ focus: '', choice: label })
    }
  }

  render() {

    const { quest, title, current, total } = this.props

    const answerList = quest.answers.map(a => {
      return (
        <Answer
          key={a.label}
          answer={a}
          isFocus={this.state.focus === a.label}
          isChoice={this.state.choice === a.label}
          click={this.handleClickAnswer}
        />
      )
    })

    return (
      <div id="test">
        <div className="test-header">
          <h2>
            <pre>{title} ({current+1}/{total})</pre>
          </h2>
        </div>
        <div className="quest">
          <div className="title">
            <strong>Quest {current + 1}: </strong> { quest.content }
          </div>

          <div className="answers">
            { answerList }
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    quest: state.test.quest,
    title: state.test.title,
    current: state.test.current,
    total: state.test.total,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

Test = connect(mapStateToProps, mapDispatchToProps)(Test)

export default Test;
