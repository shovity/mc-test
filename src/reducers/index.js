import { combineReducers } from 'redux'
import status from './statusReducer'
import auth from './authReducer'
import newsFeed from './newsFeedReducer'
import test from './testReducer'
import members from './membersReducer'
import chat from './chatReducer'

const rootReducer = combineReducers({
  status,
  auth,
  newsFeed,
  test,
  members,
  chat,
})

export default rootReducer
