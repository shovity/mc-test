import {
  RECEIVE_TOKEN, LOG_OUT, RELOAD_AVATAR
} from '../constants/actionTypes'

import history from '../history'

const initialState = {
  token: '',
  username: 'Guest',
  avatar_base: process.env.REACT_APP_API_BASE + '/avatar/',
  avatar: process.env.REACT_APP_API_BASE + '/avatar/guest',
  level: 21,
}

const authRecuder = (state=initialState, action) => {
  switch (action.type) {
    case RECEIVE_TOKEN:
      if (!action.data || !action.data.token) return state
      const { token, username, level } = action.data
      window.localStorage.token = token
      window.localStorage.username = username
      window.localStorage.level = +level
      return { ...state, token, username, avatar: state.avatar_base + username, level: +level }

    case RELOAD_AVATAR:
      if (!action.data.path) return state
      return { ...state, avatar: state.avatar + '?ts=' + Date.now() }

    case LOG_OUT:
      history.push('/login')
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('level');
      return initialState

    default:
      return state

  }
}

export default authRecuder
