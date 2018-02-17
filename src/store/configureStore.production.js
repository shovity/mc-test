import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import middlewares from '../middlewares'

const createStoreWithMiddleWare = applyMiddleware(
  ...middlewares.filter(m => m.name.indexOf(['logger']) === -1)
)(createStore)

const configureStore = (initialStore) => {
  return createStoreWithMiddleWare(
    rootReducer,
    initialStore,
  )
}

export default configureStore
