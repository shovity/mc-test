import React, { Component } from 'react'

import Dumb from './Dumb'


class SideBar extends Component {
  render() {
    const { isOpen } = this.props
    return <Dumb isOpen={isOpen} />
  }
}

export default SideBar
