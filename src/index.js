import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import history from './history'
import dotenv from 'dotenv'

import App from './components/App'
import configureStore from './store/configureStore'
import boot from './boot'
import registerServiceWorker from './registerServiceWorker'

import './index.css'

const root = document.getElementById('root')
const store = configureStore()

// setting environment
if (process.env.NODE_ENV === 'development') {
  console.log('loading environment for development')
  dotenv.config()
} else {
  console.log('loading environment for production')
  dotenv.config()
}

// boot
boot(store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  root
)

registerServiceWorker();
