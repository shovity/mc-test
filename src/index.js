import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import history from './history'

import App from './components/App'
import configureStore from './store/configureStore'
import boot from './boot'
import registerServiceWorker from './registerServiceWorker'

import 'font-awesome/css/font-awesome.min.css'
import './index.css'

const root = document.getElementById('root')
const store = configureStore()

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
