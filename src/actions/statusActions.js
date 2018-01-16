import { SET_STATUS, SET_WORK, DONE_WORK } from '../constants/actionTypes'

export const setStatus = (data) => {
  return {
    type: SET_STATUS,
    data
  }
}

export const setWork = (data) => {
  return () => ({
    type: SET_WORK,
    data
  })
}

export const doneWork = () => {
  return {
    type: DONE_WORK
  }
}
