import React, { Component } from 'react'
import Select from 'react-select'

class CreateTestStep2 extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedQuestions: '',
      questionDetail: {},
    }
  }

  selectQuestions({ size, level, subject } = {}) {
    const questions = this.props.questions
      .filter(q => q.subject === subject)
      .slice(0, size || 10)

    return questions
  }

  handleNextStep() {
    const { putTest, pickStep } = this.props
    const questions = (this.state.selectedQuestions || this.initQuestions())
    putTest({ questions: questions.map(q => q.value) })
    pickStep(3)
  }

  handleChange = (target) => {
    return (value) => {
      const ob = {}
      ob[target] = value
      this.setState(ob)
    }
  }

  initQuestions() {
    const { test } = this.props
    return this.selectQuestions({
      subject: test.subject,
      size: test.size,
    }).map(q => {
      return {
        label: `${q._id.substring(15)}(${q.subject}, ${q.content.substring(0, 5)})`,
        value: q._id,
      }
    })
  }

  showQuestionDetail(target) {
    const { questions } = this.props
    this.setState({ questionDetail: questions.find(q => q._id === target.value) })
  }

  render() {
    const { questions } = this.props

    const { selectedQuestions, questionDetail } = this.state
    const selectedQuestionsValue = selectedQuestions

    // auto select questions
    const initQuestions = this.initQuestions()

    const allQuestions = questions.map(q => {
      return {
        label: `${q._id.substring(15)}(${q.subject}, ${q.content.substring(0, 10)})`,
        value: q._id,
      }
    })

    return (
      <div>
        <h1>Select questions</h1>
        <QuestionDetail questionDetail={questionDetail} />


        <Select
          multi
          value={selectedQuestionsValue || initQuestions}
          onChange={this.handleChange('selectedQuestions')}
          placeholder="Select questions..."
          options={allQuestions}
          onValueClick={this.showQuestionDetail.bind(this)}
        />

        <div className="tac">
          <button className="btn" onClick={() => this.props.pickStep(1)}>Prev</button>
          <button className="btn btn-primary" onClick={this.handleNextStep.bind(this)}>Next</button>
        </div>
      </div>
    )
  }

}

const QuestionDetail = ({ questionDetail }) => {
  if (!questionDetail.content) return <div>Select item for show detail</div>
  return (
    <div>
      <p className="title">{questionDetail.content}</p>

      <div className="ra">
        <div className="c1">
          <div className="answer">
            <div className="answer-label">A</div>
            <div className="answer-content">
              {questionDetail.answers.find(a => a.label === 'A').content}
            </div>
          </div>
          <div className="answer">
            <div className="answer-label">B</div>
            <div className="answer-content">
              {questionDetail.answers.find(a => a.label === 'B').content}
            </div>
          </div>
        </div>

        <div className="c2">
          <div className="answer">
            <div className="answer-label">C</div>
            <div className="answer-content">
              {questionDetail.answers.find(a => a.label === 'C').content}
            </div>
          </div>
          <div className="answer">
            <div className="answer-label">D</div>
            <div className="answer-content">
              {questionDetail.answers.find(a => a.label === 'D').content}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateTestStep2
