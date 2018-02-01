import {
  RECEIVE_CHAT_HISTORY,
  SEND_CHAT_MESSAGE,
  RECEIVE_CHAT_MESSAGE,
  SHOW_CHAT,
  HIDE_CHAT,
  MINUS_CHAT
} from '../constants/actionTypes'

const initialState = {
  // 0, 1, 2 -> hide, minus, show
  show: 0,
  // [{ sender, content }]
  messages: [],
  target: '',
  unreads: []
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

      if (userx.split('-').indexOf(state.target) === -1) {
        // not focus chat, push to unreads if not exists on it
        const exists = state.unreads.indexOf(message.sender) !== -1
        console.log(exists)
        return exists? state : { ...state, unreads: state.unreads.concat(message.sender) }
      }

      // focus chat, push realtime to history
      return { ...state, show: 2, messages: state.messages.concat(message) }

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
