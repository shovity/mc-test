import { combineReducers } from 'redux'
import status from './statusReducer'
import auth from './authReducer'
import newsFeed from './newsFeedReducer'

const rootReducer = combineReducers({
  status,
  auth,
  newsFeed
})

export default rootReducer
