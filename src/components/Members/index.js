import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchChatHistory } from '../../actions/chatActions'
import { fetchAllMembers } from '../../actions/membersActions'

import './style.css'

class Members extends Component {

  componentDidMount() {
    this.props.fetchAllMembers()
  }

  render() {
    const { members, makeMessage, allMembers } = this.props
    const memberOnlineList = members.map((m, i) => {
      return (
        <Member
          key={i}
          username={m.username}
          status={m.status}
          isOnline={true}
          makeMessage={makeMessage}
        />
      )
    })

    const allMembersList = allMembers.map((m, i) => {
      return (
        <Member
          key={i}
          username={m.username}
          status={m.status}
          isOnline={!!members.find(u => u.username === m.username)}
          makeMessage={makeMessage}
        />
      )
    })

    return (
      <div id="member">
        <h2>Members online</h2>
        <ul className="member-list">
          { memberOnlineList }
        </ul>
        <h2>All Members</h2>
        <ul className="member-list">
          { allMembersList }
        </ul>
      </div>
    );
  }

}

const Member = ({ username, status, makeMessage, isOnline }) => {
  return (
    <li>
      <img src="/images/unknown-user.png" alt="" id="avatar" className="avatar"/>
      <div className="name-label"><strong>{username}</strong></div>
      <i className={`fa fa-circle ${isOnline? 'online' : ''}`}></i>
      <div className='status'>{status}</div>
      <Link to={`/profile/${username}`}><i className={`fa fa-search member-btn`}></i></Link>
      <i className={`fa fa-envelope-o member-btn`} onClick={() => makeMessage(username)}></i>
    </li>
  )
}

const mapStateTopProps = state => {
  return {
    total: state.members.total,
    members: state.members.members,
    allMembers: state.members.allMembers
  }
}

const mapDispatchToProsp = (dispatch) => {
  return {
    makeMessage: (target) => dispatch(fetchChatHistory(target)),
    fetchAllMembers: (target) => dispatch(fetchAllMembers(target)),
  }
}

Members = connect(mapStateTopProps, mapDispatchToProsp)(Members)

export default Members;
