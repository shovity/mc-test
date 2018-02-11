import {  receiveToken, loginSocket } from './authActions'
import {  setWork, doneWork, pushAlert } from './statusActions'

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
