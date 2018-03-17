import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import QuickAccess from './QuickAccess'
import Author from './Author'
import Admin from './Admin'
import Other from './Other'

import { fetchChatHistory } from '../../actions/chatActions'
import './style.css'

class SideBar extends Component {
  componentWillReceiveProps(nextProps) {
    // scroll top while navigating
    window.main.scroll({ top: 0, lef: 0 })
  }
  render() {
    const { isOpen, isConnected, username, messageUs, avatar, level } = this.props

    return (
      <div id="sidebar" className={isOpen? 'open' : ''}>
        <ul className="sidebar-menu">

          <li className="user-status">
            <img src={avatar} alt="" id="avatar" className="avatar"/>
            <div className="name-label">{username}</div>
            <i className={`fa fa-circle ${isConnected? 'online' : ''}`}></i>
          </li>

          <li>
            <input type="text" id="search" placeholder="Search..."/>
          </li>

          <QuickAccess username={username} />
          { level < 21 && <Author /> }
          { level < 11 && <Admin /> }
          { level > 20 && <Other messageUs={messageUs}/> }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isConnected: state.status.isConnected,
    username: state.auth.username,
    avatar: state.auth.avatar,
    level: state.auth.level,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    messageUs: () => dispatch(fetchChatHistory('admin'))
  }
}

SideBar = withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar))

export default SideBar
