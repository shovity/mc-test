import {
  SEND_POST
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
      casSuccess: [doneWork, pushAlert('Send post success!', 'success')]
    }
  }
}

export const sendPost = () => {
  return {
    type: SEND_POST
  }
}
