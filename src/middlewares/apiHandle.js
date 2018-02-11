/**
 * CALL API CHAIN SYSTEM
 * action - { call: { path, method, header, body .... start_calls, success_calls, error_calls } }
 */

import path from 'path'

const API_BASE = process.env.REACT_APP_API_BASE

if (!API_BASE) console.log('API_BASE env is null')

const extractParams = params => {
  return { ...params, path: path.join(API_BASE, params.path || '') }
}

const injectToken = (header, store) => {
  const token = store.getState().auth.token
  return { ...header, 'x-access-token': token }
}

const superDispatch = (store, actions, data) => {
  const dispatch = store.dispatch
  let foods = actions

  if (!Array.isArray(actions)) {
    foods = [actions]
  }

  foods.forEach(food => {
    if (typeof food === 'function') {
      dispatch(food(data))
    } else if(typeof food === 'object') {
      dispatch(food)
    } else {
      console.log('call actions invalid')
    }
  })
}

const apiHandleMiddleware = store => next => action => {
  if (!action.call) {
    next(action)
  } else {
    // Get data from call bundle
    let {
      path = '',
      method = 'GET',
      body = {},
      header = {'Content-Type': 'application/json'},
      start_calls = { type: 'NO_CALL_START'},
      success_calls = { type: 'NO_CALL_SUCCESS'},
      error_calls = { type: 'NO_CALL_ERROR'}
    } = extractParams(action.call)

    // Inject x-access-token
    header = injectToken(header, store)

    // Execute action start
    superDispatch(store, start_calls)

    // Init default options
    const options = {
      method,
      headers: new Headers(header)
    }

    // GET/HEAD can not have body
    if (method !== 'get' && method !== 'GET' && method !== 'head' && method !== 'HEAD') {
      options.body = JSON.stringify(body)
    }

    // done work here if lost path
    if (path === API_BASE) return

    fetch(path, options).then(res => res.json()).then(data => {
      if (data.err) return superDispatch(store, error_calls, data.err)
      superDispatch(store, success_calls, data)
    }).catch(error => {
      console.log(error)
      superDispatch(store, error_calls, error)
    })
  }
}

export default apiHandleMiddleware
