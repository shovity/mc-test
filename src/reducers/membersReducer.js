import {
  RECEIVE_MEMBERS,
  RECEIVE_ALL_MEMBERS
} from '../constants/actionTypes'

const initialMembersState = {
  members: [],
  allMembers: [],
  total: 0
}

const membersRecuder = (state=initialMembersState, action) => {
  const { type, data } = action

  switch (type) {
    case RECEIVE_MEMBERS:
      return { ...state,  members: data.members, total: data.total }

      case RECEIVE_ALL_MEMBERS:
        return { ...state,  allMembers: data.allMembers }

    default:
      return state
  }
}

export default membersRecuder
