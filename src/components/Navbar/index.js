import React, { Component } from 'react';
import  { connect } from 'react-redux';
import Dumb from './Dumb';
import history from '../../history'

import { logout, logoutSocket } from '../../actions/authActions'

import './style.css'

class Navbar extends Component {
  // constructor(props) {
  //   super(props)
  // }
  login() {
    history.push('/login')
  }

  render() {
    const { toggle, isOpen, isLoading, currentWork, username, logout } = this.props

    return (
      <Dumb
        toggle={toggle}
        isOpen={isOpen}
        isLoading={isLoading}
        currentWork={currentWork}
        username={username}
        logout={logout}
        login={this.login}
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

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logoutSocket())
      dispatch(logout())
    }
  }
}

Navbar = connect(mapStateToProps, mapDispatchToProps)(Navbar)

export default Navbar
