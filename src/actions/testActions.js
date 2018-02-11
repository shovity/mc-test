import {
  REQUEST_TEST,
  RECEIVE_TEST,
  REQUEST_QUESTION,
  RECEIVE_QUESTION,
  TEST_FINISHED,
  REQUEST_TEST_STATUS,
  RECEIVE_TEST_STATUS,
} from '../constants/actionTypes'

import {  setWork, doneWork, pushAlert } from './statusActions'

export const fetchTest = (id) => {
  return {
    call: {
      path: 'test?id=' + id,
      start_calls: [setWork('fetch test'), requestTest],
      success_calls: [ receiveTest, doneWork ],
      error_calls: [ pushAlert, doneWork ]
    }
  }
}

export const fetchTestStatus = (id) => {
  return {
    call: {
      path: 'test/status?id=' + id,
      start_calls: [setWork('fetch test status')],
      success_calls: [ receiveTestStatus, doneWork ],
      error_calls: [ pushAlert, doneWork ]
    }
  }
}

export const fetchQuestion = (id) => {
  return {
    socket: {
      event: 'fetch question',
      data: { id }
    }
  }
}

export const sendQuestion = (id, answer, current) => {
  return {
    socket: {
      event: 'send question',
      data: { id, answer, current }
    }
  }
}

export const requestTest = () => {
  return {
    type: REQUEST_TEST
  }
}

export const receiveTest = (data) => {
  return {
    type: RECEIVE_TEST,
    data
  }
}

export const requestQuestion = () => {
  return {
    type: REQUEST_QUESTION
  }
}

export const receiveQuestion = (data) => {
  return {
    type: RECEIVE_QUESTION,
    data
  }
}

export const testFinished = (data) => {
  return {
    type: TEST_FINISHED,
    data
  }
}

export const requestTestStatus = () => {
  return {
    type: REQUEST_TEST_STATUS
  }
}

export const receiveTestStatus = (data) => {
  return {
    type: RECEIVE_TEST_STATUS,
    data
  }
}
