import {
  RECEIVE_MEMBERS, RECEIVE_ALL_MEMBERS
} from '../constants/actionTypes'

import {  setWork, doneWork, pushAlert } from './statusActions'

export const fetchAllMembers = () => {
  return {
    call: {
      path: 'user',
      casStart: setWork('fetch all members'),
      casSuccess: [ receiveAllMembers, doneWork ],
      casError: [ pushAlert, doneWork ]
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
