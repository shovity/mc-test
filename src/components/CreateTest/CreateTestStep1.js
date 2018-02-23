import React, { Component } from 'react'
import Select from 'react-select'

class AddQuestionStep1 extends Component {

  constructor(props) {
    super(props)

    this.state = {
      subject: '',
      level: '',
    }
  }

  handleChange = (target) => {
    return (value) => {
      const ob = {}
      ob[target] = value
      this.setState(ob)
    }
  }

  handleNextStep() {
    const { pickStep, putTest } = this.props
    const { title, size, subject, level } = this.refs

    putTest({
      title: title.value,
      size: size.value,
      subject: this.state.subject.value,
      level: this.state.level.value,
    })

    pickStep(2)
  }

  render() {
    const { subject, level } = this.state
    const subjectValue = subject && subject.value
    const levelValue = level && level.value

    return (
      <div>
        <h1>Input test detail</h1>

        <label>Title</label>
        <input type="text" ref="title" placeholder="Input test title..."/>

        <label>Number of questions</label>
        <input type="number" ref="size" placeholder="Input length of test..."/>

        <label>Subject</label>
        <Select
          value={subjectValue}
          onChange={this.handleChange('subject')}
          placeholder="Select subject..."
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

        <label>Level</label>
        <Select
          placeholder="Select level..."
					options={[
            { value: '0', label: 'Rễ' },
    				{ value: '1', label: 'Trung bình' },
    				{ value: '2', label: 'Khó' },
          ]}
					onChange={this.handleChange('level')}
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
