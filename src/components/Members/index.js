import React, { Component } from 'react';
import { connect } from 'react-redux'

import { fetchChatHistory } from '../../actions/chatActions'

import './style.css'

class Members extends Component {

  render() {
    const { members, makeMessage } = this.props
    const memberList = members.map((m, i) => {
      return (
        <Member
          key={i}
          username={m.username}
          status={m.status}
          makeMessage={makeMessage}
        />
      )
    })

    return (
      <div id="member">
        <h2>Members online</h2>
        <ul className="member-list">
          { memberList }
        </ul>
      </div>
    );
  }

}

const Member = ({ username, status, makeMessage }) => {
  return (
    <li>
      <img src="/images/unknown-user.png" alt="" id="avatar" className="avatar"/>
      <div className="name-label"><strong>{username}</strong></div>
      <i className={`fa fa-circle ${status!==''? 'online' : ''}`}></i>
      <div className='status'>{status}</div>
      <i className={`fa fa-envelope-o member-btn`} onClick={() => makeMessage(username)}></i>
    </li>
  )
}

const mapStateTopProps = state => {
  return {
    total: state.members.total,
    members: state.members.members
  }
}

const mapDispatchToProsp = (dispatch) => {
  return {
    makeMessage: (target) => dispatch(fetchChatHistory(target))
  }
}

Members = connect(mapStateTopProps, mapDispatchToProsp)(Members)

export default Members;
