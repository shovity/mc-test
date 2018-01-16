import { SET_STATUS, SET_WORK, DONE_WORK } from '../constants/actionTypes'

const initialStatusState = {
  isConnected: false,
  isLoading: true,
  currentWork: 'work hard'
}

const statusReducer = (state=initialStatusState, action) => {
  switch (action.type) {
    case SET_STATUS:
      if (action.data && typeof action.data.isConnected === 'boolean') {
        return {...state, isConnected: action.data.isConnected }
      }
      return state

    case SET_WORK:
      return { ...state, isLoading: true, currentWork: action.data }

    case DONE_WORK:
      return { ...state, isLoading: false, currentWork: '' }

    default:
      return state
  }
}

export default statusReducer
