import {
  RECEIVE_MEMBERS
} from '../constants/actionTypes'

export const receiveMembers = (data) => {
  return {
    type: RECEIVE_MEMBERS,
    data
  }
}
