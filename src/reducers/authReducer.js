import {
  RECEIVE_TOKEN, LOG_OUT
} from '../constants/actionTypes'

import history from '../history'

const initialAuthState = {
  token: '',
  username: 'Guest'
}

const authRecuder = (state=initialAuthState, action) => {
  switch (action.type) {
    case RECEIVE_TOKEN:
      if (!action.data || !action.data.token) return state
      const { token, username } = action.data
      history.push('/home')
      window.localStorage.token = token
      window.localStorage.username = username
      return { ...state, token, username }

    case LOG_OUT:
      history.push('/login')
      return { ...state, token: '', username: 'Guest' }

    default:
      return state

  }
}

export default authRecuder
