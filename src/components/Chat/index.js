import React, { Component } from 'react'
import { connect } from 'react-redux'

import Message from './Message'

import { hideChat, showChat, minusChat } from '../../actions/chatActions'

import './style.css'

class Chat extends Component {

  constructor(props) {
    super(props)

    this.toggleMinus = this.toggleMinus.bind(this)
  }

  toggleMinus() {
    if (this.props.show === 1) {
      this.props.showChat()
    } else {
      this.props.minusChat()
    }
  }

  render() {
    const { show, hideChat, target, messages, username } = this.props

    const messageList = messages.map((m, i) => (
      <Message key={i} isOwn={m.sender === username} content={m.content} />
    ))

    return (
      <div id="chat" className={`${show===1? 'minus' : show===0? 'hide' : ''}`}>
        <div className="chat-header f-box">
          <div className="title" onClick={this.toggleMinus}>{target}</div>
          <i className="fa fa-minus chat-btn"  onClick={this.toggleMinus}></i>
          <i className="fa fa-times chat-btn" onClick={hideChat}></i>
        </div>

        <div className="chat-messages">
          { messageList }
          { messageList }
          { messageList }
          { messageList }
        </div>

        <div className="chat-footer f-box">
          <input type="text" className='chat-input'/>
          <i className="fa fa-send chat-send"></i>
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
    username: state.auth.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideChat: () => dispatch(hideChat()),
    minusChat: () => dispatch(minusChat()),
    showChat: () => dispatch(showChat())
  }
}

Chat = connect(mapStateToProps, mapDispatchToProps)(Chat)

export default Chat;
