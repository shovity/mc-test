import React, { Component } from 'react'
import Select from 'react-select'

class AddQuestionStep2 extends Component {

  constructor(props) {
    super(props)

    this.state = {
      subject: '',
      tags: [],
      level: '',
      trueAnswer: '',
    }

    this.handleNextStep = this.handleNextStep.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
  }

  handleChange = (target) => {
    return (value) => {
      const ob = {}
      ob[target] = value
      this.setState(ob)
    }
  }

  handlePrev() {
    const putQuestion = this.props.putQuestion
    const pickStep = this.props.pickStep

    const level = this.state.level.value
    const tags = this.state.tags.map(tag => tag.value)
    const subject = this.state.subject.value
    const true_answer = this.state.trueAnswer.value

    putQuestion({ level, tags, subject, true_answer })
    pickStep(1)
  }

  handleNextStep() {
    const putQuestion = this.props.putQuestion
    const pickStep = this.props.pickStep

    const level = this.state.level.value
    const tags = this.state.tags.map(tag => tag.value)
    const subject = this.state.subject.value
    const true_answer = this.state.trueAnswer.value

    putQuestion({ level, tags, subject, true_answer })
    pickStep(3)
  }

  render() {
    const { question } = this.props

    const { subject, tags, level, trueAnswer } = this.state
    const subjectValue = subject && subject.value
    const levelValue = level && level.value
    const trueAnswerValue = trueAnswer && trueAnswer.value
    const tagsValue = tags

    const true_answer = trueAnswer.value || ''

    return (
      <div className="step-2">
        <p className="title">{question.content}</p>

        <div className="ra">
          <div className="c1">
            <div className={`answer ${true_answer.toLowerCase() === 'a'? 'true' : ''}`}>
              <div className="answer-label true">A</div>
              <div className="answer-content">
                {question.answers.find(a => a.label === 'A').content}
              </div>
            </div>
            <div className={`answer ${true_answer.toLowerCase() === 'b'? 'true' : ''}`}>
              <div className="answer-label">B</div>
              <div className="answer-content">
                {question.answers.find(a => a.label === 'B').content}
              </div>
            </div>
          </div>

          <div className="c2">
            <div className={`answer ${true_answer.toLowerCase() === 'c'? 'true' : ''}`}>
              <div className="answer-label">C</div>
              <div className="answer-content">
                {question.answers.find(a => a.label === 'C').content}
              </div>
            </div>
            <div className={`answer ${true_answer.toLowerCase() === 'd'? 'true' : ''}`}>
              <div className="answer-label">D</div>
              <div className="answer-content">
                {question.answers.find(a => a.label === 'D').content}
              </div>
            </div>
          </div>
        </div>



        <label>True answer</label>
        <Select
          value={trueAnswerValue}
          onChange={this.handleChange('trueAnswer')}
          options={[
            {value: "a", label: "A"},
            {value: "b", label: "B"},
            {value: "c", label: "C"},
            {value: "d", label: "D"},
          ]}
        />

        <label>Subject</label>
        <Select
          value={subjectValue}
          onChange={this.handleChange('subject')}
          options={[
            {value: "Toán học", label: "Toán học"},
            {value: "Ngữ văn", label: "Ngữ văn"},
            {value: "Sinh học", label: "Sinh học"},
            {value: "Vật lý", label: "Vật lý"},
            {value: "Hóa học", label: "Hóa học"},
            {value: "Lịch sử", label: "Lịch sử"},
            {value: "Địa lý", label: "Địa lý"},
            {value: "Ngoại ngữ", label: "Ngoại ngữ"},
            {value: "Giáo dục công dân", label: "Giáo dục công dân"},
            {value: "Giáo dục quốc phòng - an ninh", label: "Giáo dục quốc phòng - an ninh"},
            {value: "Thể dục", label: "Thể dục"},
            {value: "Công nghệ", label: "Công nghệ"},
            {value: "Tin học", label: "Tin học"},
          ]}
        />

        <label>Tags</label>
        <Select.Creatable
					multi
					options={[
            { value: 'strong', label: 'strong' },
    				{ value: 'speed', label: 'speed' },
    				{ value: 'exactly', label: 'exactly' },
          ]}
					onChange={this.handleChange('tags')}
					value={tagsValue}
				/>

        <label>Level</label>
        <Select
					options={[
            { value: '1', label: '1' },
    				{ value: '2', label: '2' },
    				{ value: '4', label: '4' },
    				{ value: '5', label: '5' },
    				{ value: '6', label: '6' },
    				{ value: '7', label: '7' },
    				{ value: '8', label: '8' },
    				{ value: '9', label: '9' },
    				{ value: '10', label: '10' },
          ]}
					onChange={this.handleChange('level')}
					value={levelValue}
				/>



        <div className="tac">
          <button className="btn" onClick={() => this.props.pickStep(1)}>Prev</button>
          <button className="btn btn-primary" onClick={this.handleNextStep.bind(this)}>Next</button>
        </div>
      </div>
    )
  }

}

export default AddQuestionStep2
