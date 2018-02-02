import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchRecents, fetchChatHistory } from '../../actions/chatActions'

import './style.css'

class Messages extends Component {

  componentDidMount() {
    this.props.fetchRecents()
  }

  render() {
    const { members, recents, username, makeMessage } = this.props

    const memberList = recents.map((m, i) => {
      const targetName = m.userx.filter(u => u !== username)[0]
      const lastMessage = m.messages.slice(-1)[0]
      return (
        <Member
          key={i}
          targetName={targetName}
          message={lastMessage.content}
          isOnline={!!members.find(m => m.username === targetName)}
          makeMessage={makeMessage}
        />
      )
    })

    return (
      <div id="message">
        <h2>Recent chats</h2>
        <ul className="member-list">
          { memberList }
        </ul>
      </div>
    );
  }

}

const Member = ({ targetName, message, makeMessage, isOnline }) => {
  return (
    <li onClick={() => makeMessage(targetName)}>
      <i className={`fa fa-circle ${isOnline? 'online' : ''}`}></i>
      <img src="/images/unknown-user.png" alt="" id="avatar" className="avatar"/>
      <div className="name-label"><strong>{targetName}</strong></div>
      <div className='message'>{message}</div>
    </li>
  )
}

const mapStateTopProps = (state) => {
  return {
    recents: state.chat.recents,
    members: state.members.members,
    username: state.auth.username
  }
}

const mapDispatchTopProps = (dispatch) => {
  return {
    fetchRecents: (num) => dispatch(fetchRecents(num)),
    makeMessage: (target) => dispatch(fetchChatHistory(target))
  }
}

Messages = connect(mapStateTopProps, mapDispatchTopProps)(Messages)

export default Messages;
