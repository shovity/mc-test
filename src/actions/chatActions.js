import {
  // SEND_CHAT_MESSAGE,
  // RECEIVE_CHAT_MESSAGE,
  RECEIVE_CHAT_HISTORY,
  SHOW_CHAT,
  HIDE_CHAT,
  MINUS_CHAT
} from '../constants/actionTypes'

import {  setWork, doneWork, pushAlert } from './statusActions'


export const fetchChatHistory = (target) => {
  return {
    call: {
      path: 'chatHistory?' + `target=${target}`,
      casStart: setWork('fetch chat history'),
      casSuccess: [ pushAlert('Logged in!', 'success'), doneWork ],
      casError: [ pushAlert, doneWork ]
    }
  }
}

export const hideChat = () => {
  return {
    type: HIDE_CHAT
  }
}

export const showChat = () => {
  return {
    type: SHOW_CHAT
  }
}

export const minusChat = () => {
  return {
    type: MINUS_CHAT
  }
}
