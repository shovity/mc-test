import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Answer from './Answer'
import AcceptOverlay from './AcceptOverlay'
import { parseTime } from '../../utils/time'
import { fetchTest, fetchQuestion, sendQuestion } from '../../actions/testActions'
import Toggle from '../cells/Toggle'

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
      autoNextQuestion: true,
      waitToNextQuestion: false,
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
    // hidden next button
    this.setState({ waitToNextQuestion: false })
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

      // stop timer
      clearInterval(this.timer)

      if (this.state.autoNextQuestion) {
        // auto fetch next question
        setTimeout(() => {
          this.handleFetchQuestion(this.props.id)
        }, 500)
      } else {
        this.setState({
          waitToNextQuestion: true,
        })
      }
    }
  }

  toggleAutoNextQuestion() {
    this.setState({
      autoNextQuestion: !this.state.autoNextQuestion,
    }, () => {
      if (this.state.autoNextQuestion && this.state.waitToNextQuestion) {
        this.handleFetchQuestion(this.props.id)
      }
    })
  }

  render() {
    const { quest, title, current, total, timeLeft, isFinished } = this.props
    const id = this.props.match.params.id

    if (isFinished) return <Redirect to={`/test-detail/${id}`}/>

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

    const nextBtn = (
      !this.state.autoNextQuestion &&
      this.state.waitToNextQuestion &&
      <button
        onClick={this.handleFetchQuestion.bind(this, this.props.id)}
        className="btn btn-primary btn-next">Next
      </button>
    )

    return (
      <div id="test">
        <div className="test-header">
          <h2 className="test-title">{title} ({current+1}/{total})</h2>
          <p className="test-status">Total time left: {parseTime(timeLeft - this.state.time)} | Current question: {parseTime(this.state.time)}</p>
          <div className="test-controls">
            <Toggle className="test-toggle" isOn={this.state.autoNextQuestion} toggle={this.toggleAutoNextQuestion.bind(this)} />
            <div className="toggle-label">AUTO NEXT</div>
          </div>
        </div>
        <div className="quest">
          <div className="title"> <strong>Quest {current + 1}: </strong>{ quest.content }</div>
          <div className="answers">{ answerList }</div>
          { nextBtn }
        </div>
        <AcceptOverlay label={label} isShow={!this.state.isStarted} start={this.handleStart}/>
      </div>
    )
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
