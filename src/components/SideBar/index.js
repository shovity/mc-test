import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchChatHistory } from '../../actions/chatActions'

import Dumb from './Dumb'


class SideBar extends Component {
  render() {
    const { isOpen, isConnected, username, messageUs } = this.props
    return (
      <Dumb
        isOpen={isOpen}
        isConnected={isConnected}
        username={username}
        messageUs={messageUs}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isConnected: state.status.isConnected,
    username: state.auth.username,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    messageUs: () => dispatch(fetchChatHistory('admin'))
  }
}

SideBar = withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar))

export default SideBar
