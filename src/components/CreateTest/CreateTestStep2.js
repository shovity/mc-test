import React, { Component } from 'react'
import Select from 'react-select'

import QuestionEditor from './QuestionEditor'
import EditorModal from './EditorModal'

class CreateTestStep2 extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedQuestions: this.initQuestions(),
      isShowModal: false,
      modalQuestion: '',
    }

    this.removeQuestion = this.removeQuestion.bind(this)
  }

  selectQuestions({ size, level, subject } = {}) {
    const questions = this.props.questions
      .filter(q => {
        return !subject? true : q.subject === subject
      }).slice(0, size || 10)

    return questions
  }

  handleNextStep() {
    const { putTest, pickStep } = this.props
    const questions = this.state.selectedQuestions

    putTest({ questions: questions.map(q => q.value) })
    pickStep(3)
  }

  handleChange = (target) => {
    return (value) => {
      const dump = {}
      dump[target] = value
      this.setState(dump)
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
        value: q,
      }
    })
  }

  removeQuestion(id) {
    this.setState({
      selectedQuestions: this.state.selectedQuestions.filter(q => q.value._id !== id)
    })
  }

  toggleModal(type) {
    const isShowModal = type==='close'? false : type==='open'? true : !this.state.isShowModal
    this.setState({ isShowModal })
  }

  showEditorModal(modalQuestion) {
    this.setState({ modalQuestion }, () => {
      this.toggleModal('open')
    })
  }

  handleSubmitEditQuestion(question) {
    // clone array
    const selectedQuestions = this.state.selectedQuestions.slice()
    // edit clone array
    const targetRef = selectedQuestions.find(q => q.value._id === question._id).value
    targetRef.content = question.content
    targetRef.a = question.a
    targetRef.b = question.b
    targetRef.c = question.c
    targetRef.d = question.d

    this.setState({ selectedQuestions })
  }

  render() {
    const { questions } = this.props

    const { selectedQuestions, isShowModal, modalQuestion } = this.state
    const selectedQuestionsValue = selectedQuestions

    const allQuestionsOptions = questions.map(q => {
      return {
        label: `${q._id.substring(15)}(${q.subject}, ${q.content.substring(0, 10)})`,
        value: q,
      }
    })

    const listQuestionEditor = selectedQuestions.map((q, index) => {
      return (
        <div key={index}>
          <QuestionEditor
            question={q.value}
            index={index}
            removeQuestion={this.removeQuestion}
            showEditorModal={this.showEditorModal.bind(this, q.value)}
          />
        </div>
      )
    })

    return (
      <div>
        <h1>Edit test</h1>
        {listQuestionEditor}

        <Select
          multi
          value={selectedQuestionsValue}
          onChange={this.handleChange('selectedQuestions')}
          placeholder="Select questions..."
          options={allQuestionsOptions}
        />

        <EditorModal
          isShow={isShowModal}
          close={this.toggleModal.bind(this, 'close')}
          question={modalQuestion}
          submit={this.handleSubmitEditQuestion.bind(this)}
        />

        <div className="tac">
          <button className="btn" onClick={() => this.props.pickStep(1)}>Prev</button>
          <button className="btn btn-primary" onClick={this.handleNextStep.bind(this)}>Next</button>
        </div>
      </div>
    )
  }
}

export default CreateTestStep2
