import React, { Component } from 'react';
import  { connect } from 'react-redux';
import Dumb from './Dumb';

import './style.css'

class Navbar extends Component {
  // constructor(props) {
  //   super(props)
  // }
  render() {
    const { toggle, isOpen, isLoading, currentWork, username } = this.props

    return (
      <Dumb
        toggle={toggle}
        isOpen={isOpen}
        isLoading={isLoading}
        currentWork={currentWork}
        username={username}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.status.isLoading,
    currentWork: state.status.currentWork,
    username: state.auth.username
  }
}

Navbar = connect(mapStateToProps)(Navbar)

export default Navbar
