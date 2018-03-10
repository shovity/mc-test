import { REQUEST_HISTORY, RECEIVE_HISTORY } from '../constants/actionTypes'
import {  setWork, doneWork, pushAlert } from './statusActions'

export const fetchHistory = (limit, offset) => {
  return {
    call: {
      path: 'history',
      method: 'get',
      start_calls: [ requestHistory, setWork('fetch test history') ],
      success_calls: [ receiveHistory, doneWork ],
      error_calls: [ pushAlert, doneWork ]
    }
  }
}

export const requestHistory = () => {
  return {
    type: REQUEST_HISTORY,
  }
}

export const receiveHistory = (data) => {
  return {
    type: RECEIVE_HISTORY,
    data,
  }
}
