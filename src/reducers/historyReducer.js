import {
  REQUEST_HISTORY, RECEIVE_HISTORY, LOG_OUT
} from '../constants/actionTypes'

const initialState = {
  testLogs: [],
}

const historyReducer = (state=initialState, action) => {
  switch (action.type) {
    case REQUEST_HISTORY:
      return { ...state, testLogs: [] }

    case RECEIVE_HISTORY:
      return { ...state, testLogs: action.data.testLogs }

    case LOG_OUT:
      return initialState

    default:
      return state
  }
}

export default historyReducer
