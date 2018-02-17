import React, { Component } from 'react'
import  { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import UnreadMessage from './UnreadMessage'
import Notifications from './Notifications'
import history from '../../history'
import { destroy } from '../../actions/authActions'

import './style.css'

class Navbar extends Component {
  // constructor(props) {
  //   super(props)
  // }
  login() {
    history.push('/login')
  }

  render() {
    const {
      toggle, isOpen, isLoading, currentWork, username, logout, avatar
    } = this.props

    const isLogged = username !== 'Guest'

    return (
      <div id="navbar" className={isOpen? 'open' : ''}>
        <Link to='/home' className="logo-box">
          <div className="logo-text">MCT</div>
          <i className="fa fa-ravelry"></i>
        </Link>

        <i className="fa fa-bars menu" aria-hidden="true" onClick={toggle}></i>

        <div className="items-box"></div>

        <div className='log'>{currentWork}</div>


        <div className={`lds-css ng-scope ${isLoading? '' : 'hidden'}`}>
          <div className="lds-dual-ring">
            <div></div>
          </div>
        </div>

        <Notifications />
        <UnreadMessage />

        <div className="user-box">
          <img src={avatar} alt="" id="avatar" className="avatar"/>
          <div className="nameLabel">{username}</div>
        </div>

        <i className={`fa fa-sign-${isLogged? 'out':'in'} menu`}
          aria-hidden="true"
          onClick={isLogged? logout : this.login}>
        </i>
        {
          !isLogged &&
          <Link to='/register'>
            <i className={`fa fa-pencil menu`}
            aria-hidden="true"
            onClick={isLogged? logout : this.login}>
            </i>
          </Link>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.status.isLoading,
    currentWork: state.status.currentWork,
    username: state.auth.username,
    avatar: state.auth.avatar,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(destroy())
  }
}

Navbar = connect(mapStateToProps, mapDispatchToProps)(Navbar)

export default Navbar
