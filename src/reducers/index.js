import { combineReducers } from 'redux'
import status from './statusReducer'
import auth from './authReducer'

const rootReducer = combineReducers({
  status,
  auth
})

export default rootReducer
