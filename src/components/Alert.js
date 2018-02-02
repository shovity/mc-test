import React, { Component } from 'react';

import { connect } from 'react-redux';
import { closeAlert } from '../actions/statusActions'
import './Alert.css'

let timer = null

class Alert extends Component {

  render() {
    const { type, message, time, isOpen, close } = this.props
    isOpen && close(time)
    return (
      <div className={`alert ${type} ${isOpen? 'open' : ''}`} onClick={() => close(0)}>
        {message}
      </div>
    )
  }
}

const mapStateTopProps = (state) => {
  const alert = state.status.alert
  return {
    type: alert.type || 'danger',
    message: alert.message || '',
    time: alert.time || 3000,
    isOpen: alert.isOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    close: (time) => {
      clearTimeout(timer)
      timer = setTimeout(() => { dispatch(closeAlert()) }, time)
    }
  }
}

Alert = connect(mapStateTopProps, mapDispatchToProps)(Alert)

export default Alert;
