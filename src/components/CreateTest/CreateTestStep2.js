import React, { Component } from 'react'
import Select from 'react-select'

import QuestionEditor from './QuestionEditor'
import EditorModal from './EditorModal'

class CreateTestStep2 extends Component {

  constructor(props) {
    super(props)

    const test = this.props.test
    // that initial questions if not exists
    const selectedQuestions = this.initQuestions({ questions: test.questions })

    this.state = {
      selectedQuestions,
      isOpenModal: false,
      modalQuestion: '',
    }

    this.removeQuestion = this.removeQuestion.bind(this)
  }

  selectQuestions({ size, level, subject, all } = {}) {
    if (all) return this.props.questions

    const questions = this.props.questions
      .filter(q => {
        return !subject? true : q.subject === subject
      }).slice(0, size || 10)

    return questions
  }

  putTestAndGoStep(step) {
    const { putTest, pickStep } = this.props
    const questions = this.state.selectedQuestions

    putTest({ questions: questions.map(q => q.value) })
    pickStep(step)
  }

  handleChange = (target) => {
    return (value) => {
      const dump = {}
      dump[target] = value
      this.setState(dump, () => {
        // scroll more 500px
        window.main.scrollBy({
          top: 500,
          left: 0,
          behavior: 'smooth'
        })
      })
    }
  }

  initQuestions({ all, questions } = {}) {
    const { test } = this.props
    const objects = questions? questions : this.selectQuestions({
      subject: test.subject,
      size: test.size,
      all,
    })

    return objects.map(q => {
      return {
        label: `Subject: ${q.subject} - Content:${q.content.substring(0, 32)} - Tags: ${q.tags.join(' ')}`,
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
    const isOpenModal = type==='close'? false : type==='open'? true : !this.state.isOpenModal
    this.setState({ isOpenModal })
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
    targetRef.answers = question.answers
    targetRef.true_answer = question.true_answer

    this.setState({ selectedQuestions })
  }

  handleDuplicateQuestion(_id, { target }) {
    const selectedQuestions = this.state.selectedQuestions.slice()
    const index = selectedQuestions.findIndex(q => q.value._id === _id)
    // duplicate index
    selectedQuestions.splice(index, 0, selectedQuestions[index])
    this.setState({
      selectedQuestions,
    }, () => {
      window.main.scrollBy({
        top: target.parentNode.parentNode.clientHeight + 50,
        left: 0,
        behavior: 'smooth'
      })
    })
  }

  render() {
    const { selectedQuestions, isOpenModal, modalQuestion } = this.state
    const selectedQuestionsValue = selectedQuestions

    const listQuestionEditor = selectedQuestions.map((q, index) => {
      return (
        <div key={index}>
          <QuestionEditor
            question={q.value}
            index={index}
            removeQuestion={this.removeQuestion}
            duplicateQuestion={this.handleDuplicateQuestion.bind(this, q.value._id)}
            showEditorModal={this.showEditorModal.bind(this, q.value)}
          />
        </div>
      )
    })

    return (
      <div>
        <h1>Edit test</h1>

        {listQuestionEditor}

        <EditorModal
          isOpen={isOpenModal}
          close={this.toggleModal.bind(this, 'close')}
          question={modalQuestion}
          submit={this.handleSubmitEditQuestion.bind(this)}
        />

        <label>Find question</label>
        <div className="btn-add">
          <Select
            multi
            clearable={false}
            backspaceRemoves={false}
            value={selectedQuestionsValue}
            onChange={this.handleChange('selectedQuestions')}
            placeholder="Select questions..."
            options={this.initQuestions({ all: true })}
          />
        </div>

        <div className="tac">
          <button className="btn" onClick={this.putTestAndGoStep.bind(this, 1)}>Prev</button>
          <button className="btn btn-primary" onClick={this.putTestAndGoStep.bind(this, 3)}>Next</button>
        </div>
      </div>
    )
  }
}

export default CreateTestStep2
