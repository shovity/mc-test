import { REQUEST_TEST_DETAIL, RECEIVE_TEST_DETAIL } from '../constants/actionTypes'
import {  setWork, doneWork, pushAlert } from './statusActions'

export const fetchTestDetail = (id) => {
  return {
    call: {
      path: 'test-detail?id=' + id,
      method: 'get',
      start_calls: [ requestTestDetail, setWork('fetch test detail') ],
      success_calls: [ receiveTestDetail, doneWork ],
      error_calls: [ pushAlert, doneWork ],
    }
  }
}

export const requestTestDetail = () => {
  return {
    type: REQUEST_TEST_DETAIL,
  }
}

export const receiveTestDetail = (data) => {
  return {
    type: RECEIVE_TEST_DETAIL,
    data,
  }
}
