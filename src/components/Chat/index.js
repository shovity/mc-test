import React, { Component } from 'react'
import { connect } from 'react-redux'

import Message from './Message'

import { hideChat, showChat, minusChat, sendChatMessageSocket, requestReaded } from '../../actions/chatActions'
import { pushAlert } from '../../actions/statusActions'

import './style.css'

class Chat extends Component {

  constructor(props) {
    super(props)

    this.toggleMinus = this.toggleMinus.bind(this)
    this.handleSend = this.handleSend.bind(this)
  }

  componentDidMount() {
    this.refs.chatInput.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) this.handleSend()
    })
  }

  handleSend() {
    const message = this.refs.chatInput.value
    if (message === '') return this.props.alert('message can not null')
    this.props.send(this.props.target, message)
    this.refs.chatInput.value = ''
  }

  componentWillUpdate(nextProps) {
    // focus input and request readed when show chat box
    if (nextProps.show === 2) {
      this.refs.chatInput.focus()
      this.props.requestReaded(this.props.target)
    }
  }

  componentDidUpdate() {
    this.refs.messageBox.scrollTop = this.refs.messageBox.scrollHeight + 500
  }

  toggleMinus() {
    if (this.props.show === 1) {
      this.props.showChat()
    } else {
      this.props.minusChat()
    }
  }

  render() {
    const { show, hideChat, target, messages, username, members } = this.props

    const isTargetOnline = !!members.find(m => m.username === target)

    const messageList = messages.map((m, i) => (
      <Message key={i} isOwn={m.sender === username} content={m.content} />
    ))

    return (
      <div id="chat" className={`${show===1? 'minus' : show===0? 'hide' : ''}`}>
        <div className="chat-header f-box">
          <i className={`fa fa-circle ${isTargetOnline? 'online' : ''}`}></i>
          <div className="title" onClick={this.toggleMinus}>{target}</div>
          <i className="fa fa-minus chat-btn"  onClick={this.toggleMinus}></i>
          <i className="fa fa-times chat-btn" onClick={hideChat}></i>
        </div>

        <div ref="messageBox" className="chat-messages" onClick={() => {
          this.refs.chatInput.focus()
        }}>
          { messageList }
        </div>

        <div className="chat-footer f-box">
          <input ref="chatInput" type="text" className='chat-input'/>
          <i className="fa fa-smile-o chat-ex chat-smile"></i>
          <i
            className="fa fa-send chat-ex"
            onClick={this.handleSend.bind(this)}
          >
          </i>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    show: state.chat.show,
    messages: state.chat.messages,
    target: state.chat.target,
    username: state.auth.username,
    members: state.members.members,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideChat: () => dispatch(hideChat()),
    minusChat: () => dispatch(minusChat()),
    showChat: () => dispatch(showChat()),
    send: (target, message) => dispatch(sendChatMessageSocket(target, message)),
    alert: (message, type, time) => dispatch(pushAlert(message, type, time)),
    requestReaded: (target) => dispatch(requestReaded(target))
  }
}

Chat = connect(mapStateToProps, mapDispatchToProps)(Chat)

export default Chat;
