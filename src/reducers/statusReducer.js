import {
  SET_STATUS, SET_WORK, DONE_WORK,
  PUSH_ALERT, CLOSE_ALERT
} from '../constants/actionTypes'

const initialStatusState = {
  isConnected: false,
  isLoading: false,
  currentWork: '',
  alert: {
    isOpen: true,
    message: 'Hello!!',
    type: 'success',
    time: 1000
  }
}

const statusReducer = (state=initialStatusState, action) => {
  const data = action.data

  switch (action.type) {
    case SET_STATUS:
      if (data && typeof data.isConnected === 'boolean') {
        return {...state, isConnected: data.isConnected }
      }
      return state

    case SET_WORK:
      return { ...state, isLoading: true, currentWork: data }

    case DONE_WORK:
      return { ...state, isLoading: false, currentWork: '' }

    case PUSH_ALERT:
      const message = typeof data.message === 'string'? data.message : JSON.stringify(data.message)
      return { ...state, alert: {
          message,
          type: data.type,
          time: data.time,
          isOpen: true
        }
      }

    case CLOSE_ALERT:
      return { ...state, alert: {
          ...state.alert,
          isOpen: false
        }
      }

    default:
      return state
  }
}

export default statusReducer
