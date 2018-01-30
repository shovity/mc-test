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
      casSuccess: [receiveToken, doneWork, pushAlert('Logged in!', 'success')]
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
