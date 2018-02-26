import {
  REQUEST_TEST,
  RECEIVE_TEST,
  REQUEST_QUESTION,
  RECEIVE_QUESTION,
  TEST_FINISHED,
  REQUEST_TEST_STATUS,
  RECEIVE_TEST_STATUS,
  POST_QUESTION,
  RECEIVE_POST_QUESTION_RESULT,
  REQUEST_QUESTIONS,
  RECEIVE_QUESTIONS,
  POST_TEST,
  RECEIVE_POST_TEST_RESULT,
} from '../constants/actionTypes'

import {  setWork, doneWork, pushAlert } from './statusActions'

export const fetchTest = (id) => {
  return {
    call: {
      path: 'test?id=' + id,
      start_calls: [setWork('fetch test'), requestTest],
      success_calls: [ receiveTest, doneWork ],
      error_calls: [ pushAlert, doneWork ],
    }
  }
}

export const requestPostTest = (test) => {
  return {
    call: {
      path: 'test',
      method: 'post',
      body: { test },
      start_calls: [ setWork('post test'), postTest ],
      success_calls: [ receivePostTestResult, doneWork ],
      error_calls: [ pushAlert, doneWork ],
    }
  }
}

export const fetchQuestions = (query) => {
  return {
    call: {
      path: 'test/question?query=' + query,
      start_calls: [ setWork('fetch questons'), requestQuestions ],
      success_calls: [ receiveQuestions, doneWork ],
      error_calls: [ pushAlert, doneWork ],
    }
  }
}

export const requestPostQuestion = (question) => {
  return {
    call: {
      path: 'test/question',
      method: 'post',
      body: { question },
      start_calls: [ setWork('post question'), postQuestion ],
      success_calls: [ receivePostQuestionResult, doneWork ],
      error_calls: [ pushAlert, doneWork ],
    }
  }
}

export const fetchTestStatus = (id) => {
  return {
    call: {
      path: 'test/status?id=' + id,
      start_calls: [setWork('fetch test status')],
      success_calls: [ receiveTestStatus, doneWork ],
      error_calls: [ pushAlert, doneWork ],
    }
  }
}

export const fetchQuestion = (id) => {
  return {
    socket: {
      event: 'fetch question',
      data: { id },
    }
  }
}

export const sendQuestion = (id, answer, current) => {
  return {
    socket: {
      event: 'send question',
      data: { id, answer, current },
    }
  }
}

export const requestTest = () => {
  return {
    type: REQUEST_TEST,
  }
}

export const receiveTest = (data) => {
  return {
    type: RECEIVE_TEST,
    data,
  }
}

export const requestQuestion = () => {
  return {
    type: REQUEST_QUESTION,
  }
}

export const receiveQuestion = (data) => {
  return {
    type: RECEIVE_QUESTION,
    data,
  }
}

export const testFinished = (data) => {
  return {
    type: TEST_FINISHED,
    data,
  }
}

export const requestTestStatus = () => {
  return {
    type: REQUEST_TEST_STATUS,
  }
}

export const receiveTestStatus = (data) => {
  return {
    type: RECEIVE_TEST_STATUS,
    data,
  }
}

export const postQuestion = () => {
  return {
    type: POST_QUESTION,
  }
}

export const receivePostQuestionResult = (data) => {
  return {
    type: RECEIVE_POST_QUESTION_RESULT,
    data,
  }
}

export const requestQuestions = () => {
  return {
    type: REQUEST_QUESTIONS,
  }
}

export const receiveQuestions = (data) => {
  return {
    type: RECEIVE_QUESTIONS,
    data,
  }
}

export const postTest = () => {
  return {
    type: POST_TEST,
  }
}

export const receivePostTestResult = (data) => {
  return {
    type: RECEIVE_POST_TEST_RESULT,
    data,
  }
}
