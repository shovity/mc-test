import {
   RECEIVE_TOKEN
} from '../constants/actionTypes'

import {
  setWork, doneWork
} from './statusActions'

// call api chain actiosn
export const getAccessToken = (username, password) => {
  return {
    call: {
      path: 'auth',
      method: 'post',
      body: { username, password },
      casStart: setWork('request access token'),
      casSuccess: [receiveToken, doneWork]
    }
  }
}

// plain actions
export const receiveToken = (data) => {
  return {
    type: RECEIVE_TOKEN,
    data
  }
}
