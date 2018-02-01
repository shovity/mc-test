import {
  RECEIVE_CHAT_HISTORY,
  SEND_CHAT_MESSAGE,
  RECEIVE_CHAT_MESSAGE,
  SHOW_CHAT,
  HIDE_CHAT,
  MINUS_CHAT
} from '../constants/actionTypes'

const initialState = {
  // [0, 1, 2] -> hide, minus, show
  show: 2,
  messages: [{ sender: 'master', content: 'content message'}, { sender: 'shovity', content: 'content message 2'}],
  target: 'huong'
}

const testRecuder = (state=initialState, action) => {
  switch (action.type) {
    case RECEIVE_CHAT_HISTORY:
      return { ...state, messages: action.data.messages}

    case SEND_CHAT_MESSAGE:
      return state

    case RECEIVE_CHAT_MESSAGE:
      return { ...state, message: [ state.messages.concat(action.data.message) ] }

    case SHOW_CHAT:
      return { ...state, show: 2 }

    case HIDE_CHAT:
      return { ...state, show: 0 }

    case MINUS_CHAT:
      return { ...state, show: 1 }

    default:
      return state
  }
}

export default testRecuder
