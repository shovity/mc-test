import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import dotenv from 'dotenv'

import App from './components/App'
import configureStore from './store/configureStore'
import registerServiceWorker from './registerServiceWorker'

import './index.css'

if (process.env.NODE_ENV === 'development') {
  console.log('loading environment for development')
  dotenv.config()
} else {
  console.log('loading environment for production')
  dotenv.config()
}

const root = document.getElementById('root')
const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  root
)

registerServiceWorker();
