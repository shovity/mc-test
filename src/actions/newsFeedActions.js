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
      casStart: [sendPost, setWork('send post')],
      casSuccess: [fetchPost, doneWork, pushAlert('Send post success!', 'success')],
      casError: [ pushAlert, doneWork ]
    }
  }
}

export const fetchPost = (query = '') => {
  return {
    call: {
      path: 'post?' + query,
      casStart: [requestPost, setWork('fetch post')],
      casSuccess: [receivePost, doneWork],
      casError: [ pushAlert, doneWork ]
    }
  }
}

export const sendComment = (id, content, username) => {
  return {
    call: {
      path: 'post',
      method: 'put',
      body: { id, content },
      casStart: [ receiveComment({ id, comment: { content, username } }), setWork('send comment') ],
      casSuccess: [ doneWork ],
      casError: [ pushAlert, fetchPost, doneWork ]
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
