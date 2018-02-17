import configureStoreDevelopment from './configureStore.development'
import configureStoreProduction from './configureStore.production'

let configureStore

if (process.env.NODE_ENV === 'production') {
  console.log('load config store for production')
  configureStore = configureStoreProduction
} else {
  console.log('load config store for development')
  configureStore = configureStoreDevelopment
}

export default configureStore
