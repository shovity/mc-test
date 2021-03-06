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
import notifications from './notificationsReducer'

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
  notifications,
})

export default rootReducer
