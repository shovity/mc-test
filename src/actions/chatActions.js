import {
  // SEND_CHAT_MESSAGE,
  RECEIVE_CHAT_MESSAGE,
  RECEIVE_CHAT_HISTORY,
  SHOW_CHAT,
  HIDE_CHAT,
  MINUS_CHAT,
  RECEIVE_UNREADED,
  RECEIVE_RECENTS_CHAT
} from '../constants/actionTypes'

import {  setWork, doneWork, pushAlert } from './statusActions'

export const fetchRecents = (num) => {
  return {
    call: {
      path: 'chatHistory?recents=' + num || 10,
      casStart: setWork('fetch recents message'),
      casSuccess: [ receiveRecentsChat, doneWork ],
      casError: [ pushAlert, doneWork ]
    }
  }
}

export const requestReaded = (target) => {
  return {
    call: {
      path: 'chatHistory',
      method: 'put',
      body: { target },
      casStart: setWork('request readed message'),
      casSuccess: [ doneWork ],
      casError: [ pushAlert, doneWork ]
    }
  }
}

export const fetchChatHistory = (target) => {
  return {
    call: {
      path: `chatHistory?target=${target}`,
      casStart: setWork('fetch chat history'),
      casSuccess: [ receiveChatHistory, showChat, doneWork ],
      casError: [ pushAlert, doneWork ]
    }
  }
}

export const sendChatMessageSocket = (target, message) => {
  return {
    socket: {
      event: 'send message',
      data: { target, message }
    }
  }
}

export const receiveUnread = (data) => {
  return {
    type: RECEIVE_UNREADED,
    data
  }
}

export const receiveRecentsChat = (data) => {
  return {
    type: RECEIVE_RECENTS_CHAT,
    data
  }
}

export const fetchUnread = () => {
  return {
    call: {
      path: 'chatHistory/unread',
      casStart: setWork('fetch unread message'),
      casSuccess: [ receiveUnread, doneWork ],
      casError: [ pushAlert, doneWork ]
    }
  }
}

export const receiveChatMessage = (data) => {
  return {
    type: RECEIVE_CHAT_MESSAGE,
    data
  }
}

export const receiveChatHistory = (data) => {
  return {
    type: RECEIVE_CHAT_HISTORY,
    data
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
