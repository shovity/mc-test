import { combineReducers } from 'redux'
import status from './statusReducer'
import auth from './authReducer'
import newsFeed from './newsFeedReducer'
import test from './testReducer'
import testDetail from './testDetailReducer'
import members from './membersReducer'
import chat from './chatReducer'
import user from './userReducer'
import history from './historyReducer'

const rootReducer = combineReducers({
  status,
  auth,
  newsFeed,
  test,
  testDetail,
  members,
  chat,
  user,
  history,
})

export default rootReducer
