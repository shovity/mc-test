import {
  RECEIVE_TEST_DETAIL, LOG_OUT
} from '../constants/actionTypes'

const initialState = {
  object: {}
}

const testDetailRecuder = (state=initialState, action) => {
  switch (action.type) {
    case RECEIVE_TEST_DETAIL:
      return { ...state, test: action.data.test, testLog: action.data.testLog, testStatus: action.data.testStatus }

    case LOG_OUT:
      return initialState

    default:
      return state
  }
}

export default testDetailRecuder
