import React, { Component } from 'react'
import Select from 'react-select'

class AddQuestionStep1 extends Component {

  constructor(props) {
    super(props)

    const test = this.props.test
    const subject = test.subject? { label: test.subject, value: test.subject } : ''
    const level = test.level? { label: test.level, value: test.level } : ''

    this.state = {
      title: test.title || '',
      size: test.size || 10,
      time: test.time || 60,
      subject,
      level,
    }

    this.subjectOptions = [
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
    ]

    this.levelOptions = [
      { value: 'Dễ', label: 'Dễ' },
      { value: 'Trung bình', label: 'Trung bình' },
      { value: 'Khó', label: 'Khó' },
    ]

    this.handleOnChangeInput = this.handleOnChangeInput.bind(this)
    this.handleChangeSelect = this.handleChangeSelect.bind(this)
  }

  handleChangeSelect = (target) => {
    return (value) => {
      const dump = {}
      dump[target] = value
      this.setState(dump)
    }
  }

  handleOnChangeInput(field) {
    return (event) => {
      const dump = {}
      dump[field] = event.target.value
      this.setState(dump)
    }
  }

  handleNextStep() {
    const { pickStep, putTest } = this.props
    const { title, size, time } = this.refs

    putTest({
      title: title.value,
      size: size.value,
      time: time.value,
      subject: this.state.subject.value,
      level: this.state.level.value,
    })

    pickStep(2)
  }


  render() {
    const { title, subject, size, level, time } = this.state
    const subjectValue = subject && subject.value
    const levelValue = level && level.value

    return (
      <div>
        <h1>Input test detail</h1>

        <label>Title</label>
        <input
          value={title}
          onChange={this.handleOnChangeInput('title')}
          type="text"
          ref="title"
          placeholder="Input test title..."
        />

        <label>Number of questions <span className="hint">(options for random test)</span></label>
        <input
          value={size}
          onChange={this.handleOnChangeInput('size')}
          type="number"
          ref="size"
          placeholder="Input length of test..."
        />

        <label>Total time <span className="hint">(minutes)</span></label>
        <input
          value={time}
          onChange={this.handleOnChangeInput('time')}
          type="number"
          ref="time"
          placeholder="Input total times of test..."
        />

        <label>Subject</label>
        <Select
          value={subjectValue}
          onChange={this.handleChangeSelect('subject')}
          placeholder="Select subject..."
          options={this.subjectOptions}
        />

        <label>Level</label>
        <Select
          placeholder="Select level..."
					options={this.levelOptions}
					onChange={this.handleChangeSelect('level')}
					value={levelValue}
				/>

        <div className="tac">
          <button className="btn btn-primary" onClick={this.handleNextStep.bind(this)}>Next</button>
        </div>
      </div>
    )
  }

}

export default AddQuestionStep1
