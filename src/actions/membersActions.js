import {
  RECEIVE_MEMBERS, RECEIVE_ALL_MEMBERS
} from '../constants/actionTypes'

import {  setWork, doneWork, pushAlert } from './statusActions'

export const fetchAllMembers = () => {
  return {
    call: {
      path: 'user',
      start_calls: setWork('fetch all members'),
      success_calls: [ receiveAllMembers, doneWork ],
      error_calls: [ pushAlert, doneWork ]
    }
  }
}

export const receiveMembers = (data) => {
  return {
    type: RECEIVE_MEMBERS,
    data
  }
}

export const receiveAllMembers = (data) => {
  return {
    type: RECEIVE_ALL_MEMBERS,
    data
  }
}
