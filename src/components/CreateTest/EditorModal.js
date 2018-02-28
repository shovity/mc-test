import React, { Component } from 'react'

import Modal from '../cells/Modal'

class EditorModal extends Component {

  constructor(props) {
    super(props)

    this.state = {
      true_answer: ''
    }

    this.selectAnswer = this.selectAnswer.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { question, isOpen } = nextProps
    const { content, a, b, c, d } = this.refs

    this.setState({ true_answer: '' })

    // not handle for close modal
    if (!isOpen) return

    content.value = question.content
    a.value = question.answers.find(a => a.label.toLowerCase() === 'a').content
    b.value = question.answers.find(a => a.label.toLowerCase() === 'b').content
    c.value = question.answers.find(a => a.label.toLowerCase() === 'c').content
    d.value = question.answers.find(a => a.label.toLowerCase() === 'd').content
  }

  handleSubmit() {
    const { submit, question, close } = this.props
    const { content, a, b, c, d } = this.refs

    submit({
      _id: question._id,
      content: content.value,
      true_answer: this.state.true_answer,
      answers: [
        { label: 'a', content: a.value },
        { label: 'b', content: b.value },
        { label: 'c', content: c.value },
        { label: 'd', content: d.value },
      ]
    })

    close()
  }

  selectAnswer({ target }) {
    this.setState({
      true_answer: target.innerHTML.toLowerCase()
    })
  }

  render() {
    const { isOpen, question, close } = this.props
    const true_answer = this.state.true_answer || question.true_answer

    if (!question) return <div></div>

    return (
      <Modal isOpen={isOpen} close={close} title="Edit question">
        <textarea className="input-content" ref="content"></textarea>

        <div className="f-box">
          <label className={`a-l ${true_answer.toLowerCase() === 'a'? 'true' : ''}`} onClick={this.selectAnswer}>
            A
          </label>
          <input type="text" ref="a"/>
        </div>

        <div className="f-box">
          <label className={`a-l ${true_answer.toLowerCase() === 'b'? 'true' : ''}`} onClick={this.selectAnswer}>
            B
          </label>
          <input type="text" ref="b"/>
        </div>

        <div className="f-box">
          <label className={`a-l ${true_answer.toLowerCase() === 'c'? 'true' : ''}`} onClick={this.selectAnswer}>
            C
          </label>
          <input type="text" ref="c"/>
        </div>

        <div className="f-box">
          <label className={`a-l ${true_answer.toLowerCase() === 'd'? 'true' : ''}`} onClick={this.selectAnswer}>
            D
          </label>
          <input type="text" ref="d"/>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Edit</button>
        </div>
      </Modal>
    )
  }
}

export default EditorModal
