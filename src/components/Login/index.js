import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { getAccessToken } from '../../actions/authActions'
import { pushAlert } from '../../actions/statusActions'

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin() {
    const username = this.refs.username.value
    const password = this.refs.password.value
    if (username === '' || password === '') {
      return this.props.pushAlert('Username and Password is required', 'danger')
    }
    this.props.login(username, password)
  }

  render() {
    const { isLogged } = this.props

    // redirect to home if logged
    if (isLogged) return <Redirect to='/home' />

    return (
      <div>
        <h2>Login {this.props.isLogged? 'da login' : ''}</h2>

        <label htmlFor='username'>Username</label>
        <input type='text' ref='username' />

        <label htmlFor='password'>Password</label>
        <input type='password' ref='password' />

        <button className='btn btn-primary' onClick={this.handleLogin}>Login</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    isLogged: state.auth.token !== ''
  }
}

const mapDispatchToState = (dispatch) => {
  return {
    login: (username, password) => dispatch(getAccessToken(username, password)),
    pushAlert: (message, type, time) => dispatch(pushAlert(message, type, time))
  }
}

Login = connect(mapStateToProps, mapDispatchToState)(Login)

export default Login
