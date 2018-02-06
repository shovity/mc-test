import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Answer from './Answer'
import AcceptOverlay from './AcceptOverlay'
import { fetchTest, fetchQuestion, sendQuestion } from '../../actions/testActions'
import './style.css'

class Test extends Component {

  constructor(props) {
    super(props)

    this.state = {
      focus: '',
      choice: '',
      isStarted: false,
      isFetchTest: false,
      time: 0,
    }

    this.timer = null

    this.handleClickAnswer = this.handleClickAnswer.bind(this)
    this.handleStart = this.handleStart.bind(this)
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.handleFetchTest(id)
  }

  componentWillReceiveProps(nextProps) {
    const id = nextProps.match.params.id
    this.handleFetchTest(id)
    if (nextProps.id !== this.props.id) {
      this.setState({ isFetchTest: false })
    }
  }

  /**
   * Start a test
   */
  handleStart() {
    // if is fetching, break
    if (this.state.isFetchTest) return
    // request fetch
    this.handleFetchQuestion(this.props.id)
    // set state
    this.setState({ isStarted: true })
    // set timer
    if (this.timer === null) {
      this.timer = setInterval(() => {
        this.setState({ time: this.state.time+1 })
      }, 1000)
    }
  }

  handleFetchTest(id) {
    if (id !== this.props.id && !this.state.isFetchTest) {
      this.props.fetchTest(id)
      this.setState({ isFetchTest: true })
    }
  }

  handleFetchQuestion(id) {
    // remove select
    this.setState({ focus: '', choice: '', })
    // reset time
    this.setState({ time: 0 })
    // fetch next question
    this.props.fetchQuestion(id)
  }

  handleClickAnswer(label) {
    // was done
    if (this.state.choice !== '') return

    if (this.state.focus !== label) {
      this.setState({ focus: label })
    } else {
      this.setState({ focus: '', choice: label })
      this.props.sendQuestion(this.props.id, label, this.props.current)
      // fetch next question
      setTimeout(() => {
        this.handleFetchQuestion(this.props.id)
      }, 500)
    }
  }

  parseTime(secends) {
    if (secends > 3600) return `${Math.floor(secends/3600)}h ${this.parseTime(secends%3600)}`
    if (secends > 60) return `${Math.floor(secends/60)}' ${secends%60}s`
    return `${secends}s`
  }

  render() {
    const { quest, title, current, total, timeLeft, isFinished } = this.props
    const id = this.props.match.params.id

    if (isFinished) return <Redirect to={`/test-status/${id}`} />

    const label = !this.state.isFetchTest? 'START' : 'fetching...'

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
            {title} ({current+1}/{total})
          </h2>
          <p>Total time left: {this.parseTime(timeLeft - this.state.time)} / Current question: {this.parseTime(this.state.time)}</p>
        </div>
        <div className="quest">
          <div className="title">
            <strong>Quest {current + 1}: </strong> { quest.content }
          </div>

          <div className="answers">
            { answerList }
          </div>

        </div>

        <AcceptOverlay label={label} isShow={!this.state.isStarted} start={this.handleStart}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quest: state.test.quest,
    title: state.test.title,
    current: state.test.current,
    total: state.test.total,
    id: state.test.id,
    time: state.test.time,
    timeLeft: state.test.timeLeft,
    isFinished: state.test.isFinished,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTest: (id) => dispatch(fetchTest(id)),
    fetchQuestion: (id) => dispatch(fetchQuestion(id)),
    sendQuestion: (id, answer, current) => dispatch(sendQuestion(id, answer, current)),
  }
}

Test = connect(mapStateToProps, mapDispatchToProps)(Test)

export default Test;
