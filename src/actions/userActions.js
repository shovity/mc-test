import {  receiveToken } from './authActions'
import {  setWork, doneWork } from './statusActions'

// call chain api
export const createUser = (username, password) => {
  return {
    call: {
      path: 'user',
      method: 'post',
      body: { username, password },
      casStart: setWork('create user'),
      casSuccess: [receiveToken, doneWork]
    }
  }
}
