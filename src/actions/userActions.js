import { RECEIVE_USER_INFO } from '../constants/actionTypes'
import {  receiveToken, loginSocket, reloadAvatar } from './authActions'
import {  setWork, doneWork, pushAlert } from './statusActions'

export const putProfile = (body) => {
  return {
    call: {
      path: 'avatar',
      method: 'put',
      header: { }, // content-type must auto set with FormData
      body,
      start_calls: setWork('put user profile'),
      success_calls: [ reloadAvatar, receiveUserInfo, pushAlert('Put profile success', 'success'), doneWork ],
      error_calls: [ pushAlert, doneWork ]
    }
  }
}

// call chain api
export const createUser = (username, password) => {
  return {
    call: {
      path: 'user',
      method: 'post',
      body: { username, password },
      start_calls: setWork('create user'),
      success_calls: [receiveToken, loginSocket, doneWork, pushAlert('Register sucess, logged in!', 'success')],
      error_calls: [ pushAlert, doneWork ]
    }
  }
}

export const fetchUserInfo = (username) => {
  return {
    call: {
      path: 'user/' + username,
      start_calls: [ setWork(`fetch ${username}'s user info'`) ],
      success_calls: [ receiveUserInfo, doneWork ],
      error_calls: [ pushAlert, doneWork ]
    }
  }
}

// plain actions

export const receiveUserInfo = data => {
  return {
    type: RECEIVE_USER_INFO,
    data
  }
}
