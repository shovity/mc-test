import {
  REQUEST_TOKEN, RECEIVE_TOKEN, LOG_OUT, RELOAD_AVATAR
} from '../constants/actionTypes'

import { receiveChatHistory } from './chatActions'

import {
  setWork, doneWork, pushAlert
} from './statusActions'

// call api chain actions
export const getAccessToken = (username, password) => {
  return {
    call: {
      path: 'auth',
      method: 'post',
      body: { username, password },
      start_calls: setWork('request access token'),
      success_calls: [ receiveToken, loginSocket, pushAlert('Logged in!', 'success'), doneWork ],
      error_calls: [ pushAlert, doneWork ]
    }
  }
}

export const destroy = () => {
  return {
    call: {
      start_calls: [ logoutSocket, logout, receiveChatHistory({ messages: [], target: '' }), ]
    }
  }
}

// plain actions
export const requestToken = () => {
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

export const reloadAvatar = () => {
  return {
    type: RELOAD_AVATAR
  }
}
