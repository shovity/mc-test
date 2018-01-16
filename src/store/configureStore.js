import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import middlewares from '../middlewares'

const createStoreWithMiddleWare = applyMiddleware(...middlewares)(createStore)
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const configureStore = (initialStore) => {
  return createStoreWithMiddleWare(
    rootReducer,
    initialStore,
    devTools
  )
}

export default configureStore