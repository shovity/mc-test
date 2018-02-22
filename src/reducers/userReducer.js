import {
  RECEIVE_USER_INFO, LOG_OUT
} from '../constants/actionTypes'

const initialState = {
  userInfo: {}
}

const userRecuder = (state=initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER_INFO:
      return { ...state, userInfo: action.data.userInfo }

    case LOG_OUT:
      return initialState

    default:
      return state
  }
}

export default userRecuder
