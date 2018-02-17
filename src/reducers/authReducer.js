import {
  RECEIVE_TOKEN, LOG_OUT, RELOAD_AVATAR
} from '../constants/actionTypes'

import history from '../history'

const initialAuthState = {
  token: '',
  username: 'Guest',
  avatar_base: process.env.REACT_APP_API_BASE + '/avatar/',
  avatar: ''
}

const authRecuder = (state=initialAuthState, action) => {
  switch (action.type) {
    case RECEIVE_TOKEN:
      if (!action.data || !action.data.token) return state
      const { token, username } = action.data
      window.localStorage.token = token
      window.localStorage.username = username
      return { ...state, token, username, avatar: state.avatar_base + username }

    case RELOAD_AVATAR:
      return { ...state, avatar: state.avatar + '?ts=' + Date.now() }

    case LOG_OUT:
      history.push('/login')
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('token');
      return { ...state, token: '', username: 'Guest', avatar: state.avatar_base + 'guest' }

    default:
      return state

  }
}

export default authRecuder
