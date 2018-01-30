import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { createUser } from '../../actions/userActions'
import { pushAlert } from '../../actions/statusActions'

class Register extends Component {
  constructor(props) {
    super(props);

    this.handleRegister = this.handleRegister.bind(this)
  }

  handleRegister() {
    const username = this.refs.username.value
    const password = this.refs.password.value
    const rePassword = this.refs.rePassword.value
    if (username === '' || password === '') {
      return this.props.pushAlert('Username and Password is required', 'danger')
    }

    if (password !== rePassword) {
      return this.props.pushAlert('Retype password not match', 'danger')
    }

    this.props.register(username, password)
  }

  render() {
    const { isLogged } = this.props

    // redirect to home if logged
    if (isLogged) return <Redirect to='/home' />

    return (
      <div>
        <h2>Register</h2>

        <label htmlFor='username'>Username</label>
        <input type='text' ref='username' />

        <label htmlFor='password'>Password</label>
        <input type='password' ref='password' />

        <label htmlFor='password'>Retype password</label>
        <input type='password' ref='rePassword' />

        <button className='btn btn-primary' onClick={this.handleRegister}>Register</button>
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
    register: (username, password) => dispatch(createUser(username, password)),
    pushAlert: (message, type, time) => dispatch(pushAlert(message, type, time))
  }
}

Register = connect(mapStateToProps, mapDispatchToState)(Register)

export default Register
