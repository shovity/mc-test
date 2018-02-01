import {
  RECEIVE_MEMBERS
} from '../constants/actionTypes'

const initialMembersState = {
  members: [],
  total: 0
}

const membersRecuder = (state=initialMembersState, action) => {
  const { type, data } = action

  switch (type) {
    case RECEIVE_MEMBERS:
      return { ...state,  ...data }

    default:
      return state
  }
}

export default membersRecuder
