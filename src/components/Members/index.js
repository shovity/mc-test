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
    const { members, makeMessage, allMembers, avatar_base, my_username, my_avatar } = this.props
    const memberOnlineList = members.map((m, i) => {
      return (
        <Member
          key={i}
          username={m.username}
          avatar_base={avatar_base}
          status={m.status}
          isOnline={true}
          makeMessage={makeMessage}
          my_avatar={my_avatar}
          my_username={my_username}
        />
      )
    })

    const allMembersList = allMembers.map((m, i) => {
      return (
        <Member
          key={i}
          username={m.username}
          avatar_base={avatar_base}
          status={m.status}
          isOnline={!!members.find(u => u.username === m.username)}
          makeMessage={makeMessage}
          my_avatar={my_avatar}
          my_username={my_username}
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

const Member = ({ username, status, makeMessage, isOnline, avatar_base, my_username, my_avatar }) => {
  const avatar = (username === my_username)? my_avatar : avatar_base + username
  return (
    <li>
      <img src={avatar} alt="" id="avatar" className="avatar"/>
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
    allMembers: state.members.allMembers,
    avatar_base: state.auth.avatar_base,
    my_username: state.auth.username,
    my_avatar: state.auth.avatar,
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
