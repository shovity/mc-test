import { combineReducers } from 'redux'
import status from './statusReducer'
import auth from './authReducer'
import newsFeed from './newsFeedReducer'
import test from './testReducer'
import members from './membersReducer'

const rootReducer = combineReducers({
  status,
  auth,
  newsFeed,
  test,
  members,
})

export default rootReducer
