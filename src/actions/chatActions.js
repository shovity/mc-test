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
      path: 'chat-history?recents=' + num || 10,
      start_calls: setWork('fetch recents message'),
      success_calls: [ receiveRecentsChat, doneWork ],
      error_calls: [ pushAlert, doneWork ]
    }
  }
}

export const requestReaded = (target) => {
  return {
    call: {
      path: 'chat-history',
      method: 'put',
      body: { target },
      start_calls: setWork('request readed message'),
      success_calls: [ doneWork ],
      error_calls: [ pushAlert, doneWork ]
    }
  }
}

export const fetchChatHistory = (target) => {
  return {
    call: {
      path: `chat-history?target=${target}`,
      start_calls: setWork('fetch chat history'),
      success_calls: [ receiveChatHistory, showChat, doneWork ],
      error_calls: [ pushAlert, doneWork ]
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
      path: 'chat-history/unread',
      start_calls: setWork('fetch unread message'),
      success_calls: [ receiveUnread, doneWork ],
      error_calls: [ pushAlert, doneWork ]
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
