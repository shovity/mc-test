import React, { Component } from 'react'
import { connect } from 'react-redux';

import { createUser } from '../../actions/userActions';


class Register extends Component {
  constructor(props) {
    super(props);

    this.handleRegister = this.handleRegister.bind(this)
  }

  handleRegister() {
    const username = this.refs.username.value
    const password = this.refs.password.value
    this.props.register(username, password)
  }

  render() {
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
    error: state.auth.error
  }
}

const mapDispatchToState = (dispatch) => {
  return {
    register: (username, password) => dispatch(createUser(username, password))
  }
}

Register = connect(mapStateToProps, mapDispatchToState)(Register)

export default Register
