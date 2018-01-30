import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Dumb from './Dumb'


class SideBar extends Component {
  render() {
    const { isOpen, isConnected } = this.props
    return <Dumb isOpen={isOpen} isConnected={isConnected} />
  }
}

const mapStateToProps = (state) => {
  return {
    isConnected: state.status.isConnected
  }
}

SideBar = withRouter(connect(mapStateToProps)(SideBar))

export default SideBar
