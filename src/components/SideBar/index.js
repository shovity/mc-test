import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Dumb from './Dumb'


class SideBar extends Component {
  render() {
    const { isOpen, isConnected, username } = this.props
    return (
      <Dumb
        isOpen={isOpen}
        isConnected={isConnected}
        username={username}
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

SideBar = withRouter(connect(mapStateToProps)(SideBar))

export default SideBar
