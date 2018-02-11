import {
  SEND_POST, REQUEST_POST, RECEIVE_POST, RECEIVE_COMMENT
} from '../constants/actionTypes'

import {
  setWork, doneWork, pushAlert
} from './statusActions'

// call api chain actiosn
export const requestSendPost = (content) => {
  return {
    call: {
      path: 'post',
      method: 'post',
      body: { content },
      start_calls: [sendPost, setWork('send post')],
      success_calls: [fetchPost, doneWork, pushAlert('Send post success!', 'success')],
      error_calls: [ pushAlert, doneWork ]
    }
  }
}

export const fetchPost = (query = '') => {
  return {
    call: {
      path: 'post?' + query,
      start_calls: [requestPost, setWork('fetch post')],
      success_calls: [receivePost, doneWork],
      error_calls: [ pushAlert, doneWork ]
    }
  }
}

export const sendComment = (id, content, username) => {
  return {
    call: {
      path: 'post',
      method: 'put',
      body: { id, content },
      start_calls: [ receiveComment({ id, comment: { content, username } }), setWork('send comment') ],
      success_calls: [ doneWork ],
      error_calls: [ pushAlert, fetchPost, doneWork ]
    }
  }
}



export const sendPost = () => {
  return {
    type: SEND_POST
  }
}

export const requestPost = () => {
  return {
    type: REQUEST_POST
  }
}

export const receivePost = (data) => {
  return {
    type: RECEIVE_POST,
    data
  }
}

export const receiveComment = (data) => {
  return {
    type: RECEIVE_COMMENT,
    data
  }
}
