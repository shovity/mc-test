import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getAccessToken } from '../../actions/authActions';


class Login extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin() {
    const username = this.refs.username.value
    const password = this.refs.password.value
    this.props.login(username, password)
  }

  render() {
    return (
      <div>
        <h2>Login</h2>

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
    error: state.auth.error
  }
}

const mapDispatchToState = (dispatch) => {
  return {
    login: (username, password) => dispatch(getAccessToken(username, password))
  }
}

Login = connect(mapStateToProps, mapDispatchToState)(Login)

export default Login
