import {
  RECEIVE_TOKEN
} from '../constants/actionTypes'

const initialAuthState = {
  token: '',
  username: 'Guest'
}

const authRecuder = (state=initialAuthState, action) => {
  switch (action.type) {
    case RECEIVE_TOKEN:
      if (!action.data || !action.data.token) return state
      const { token, username } = action.data
      return { ...state, token, username }

    default:
      return state

  }
}

export default authRecuder
