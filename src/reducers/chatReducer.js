import {
  RECEIVE_CHAT_HISTORY,
  SEND_CHAT_MESSAGE,
  RECEIVE_CHAT_MESSAGE,
  SHOW_CHAT,
  HIDE_CHAT,
  MINUS_CHAT,
  RECEIVE_UNREADED,
  RECEIVE_RECENTS_CHAT
} from '../constants/actionTypes'

const initialState = {
  // 0, 1, 2 -> hide, minus, show
  show: 0,
  // [{ String: sender, String: content }]
  messages: [],
  target: '',
  // [String: username]
  unreads: [],
  recents: []
}

const testRecuder = (state=initialState, action) => {
  switch (action.type) {
    case RECEIVE_CHAT_HISTORY:
      const { messages, target } = action.data
      const ounreads = state.unreads.slice()
      const iu = ounreads.indexOf(target)
      if (iu !== -1) ounreads.splice(iu, 1)

      return { ...state, messages, target, unreads: ounreads }

    case SEND_CHAT_MESSAGE:
      return state

    case RECEIVE_CHAT_MESSAGE:
      const { userx, message } = action.data

      if (userx.indexOf(state.target) === -1) {
        // not focus chat, push to unreads if not exists on it
        const exists = state.unreads.indexOf(message.sender) !== -1
        return exists? state : { ...state, unreads: state.unreads.concat(message.sender) }
      }

      // focus chat, push realtime to history
      return { ...state, show: 2, messages: state.messages.concat(message) }

    case SHOW_CHAT:
      return { ...state, show: 2 }

    case HIDE_CHAT:
      return { ...state, show: 0, target: '', messages: [] }

    case MINUS_CHAT:
      return { ...state, show: 1 }

    case RECEIVE_UNREADED:
      return { ...state, unreads: action.data.unreads }

    case RECEIVE_RECENTS_CHAT:
      return { ...state, recents: action.data.recents }

    default:
      return state
  }
}

export default testRecuder
