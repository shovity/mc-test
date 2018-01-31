import { combineReducers } from 'redux'
import status from './statusReducer'
import auth from './authReducer'
import newsFeed from './newsFeedReducer'
import test from './testReducer'

const rootReducer = combineReducers({
  status,
  auth,
  newsFeed,
  test
})

export default rootReducer
