import {
  SET_STATUS, SET_WORK, DONE_WORK,
  PUSH_ALERT, CLOSE_ALERT
} from '../constants/actionTypes'

export const setStatus = (data) => {
  return {
    type: SET_STATUS,
    data
  }
}

export const setWork = (data) => {
  return (store) => ({
    type: SET_WORK,
    data
  })
}

export const doneWork = () => {
  return {
    type: DONE_WORK
  }
}

export const pushAlert = (message, type, time) => {
  return {
    type: PUSH_ALERT,
    data: { message, type, time }
  }
}

export const closeAlert = () => {
  return {
    type: CLOSE_ALERT
  }
}
