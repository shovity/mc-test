import {
  REQUEST_TOKEN, RECEIVE_TOKEN, LOG_OUT
} from '../constants/actionTypes'

import {
  setWork, doneWork, pushAlert
} from './statusActions'

// call api chain actiosn
export const getAccessToken = (username, password) => {
  return {
    call: {
      path: 'auth',
      method: 'post',
      body: { username, password },
      casStart: setWork('request access token'),
      casSuccess: [ receiveToken, loginSocket, pushAlert('Logged in!', 'success'), doneWork ],
      casError: [ pushAlert, doneWork ]
    }
  }
}

// plain actions
export const requestToken = (data) => {
  return {
    type: REQUEST_TOKEN,
  }
}

export const receiveToken = (data) => {
  return {
    type: RECEIVE_TOKEN,
    data
  }
}

export const logout = () => {
  return {
    type: LOG_OUT
  }
}

export const loginSocket = token => {
  return {
    socket: {
      event: 'login',
      data: token
    }
  }
}

export const logoutSocket = () => {
  return {
    socket: {
      event: 'logout'
    }
  }
}
