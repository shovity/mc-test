import React, { Component } from 'react'

class EditorModal extends Component {

  componentWillReceiveProps(nextProps) {
    const { question, isShow } = nextProps
    const { content, a, b, c, d } = this.refs

    // not handle for close modal
    if (!isShow) return

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
      answers: [
        { label: 'a', content: a.value },
        { label: 'b', content: b.value },
        { label: 'c', content: c.value },
        { label: 'd', content: d.value },
      ]
    })

    close()
  }

  render() {
    const { isShow, question, close, submit } = this.props

    if (!question) return <div></div>

    return (
      <div className={`${isShow? 'fade-in' : 'fade-out'}`}>
        <div className="overlay"></div>
        <div className="editor-modal">
          <div className="controls-bar">
            <i className="fa fa-times controls-bar-btn" onClick={close}></i>
          </div>

          <label>Questions content</label>
          <textarea className="input-content" ref="content"></textarea>

          <label>Answer A</label>
          <input type="text" ref="a"/>
          <label>Answer B</label>
          <input type="text" ref="b"/>
          <label>Answer C</label>
          <input type="text" ref="c"/>
          <label>Answer D</label>
          <input type="text" ref="d"/>

          <div className="modal-footer">
            <button className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Edit</button>
          </div>
        </div>
      </div>
    )
  }

}

export default EditorModal
