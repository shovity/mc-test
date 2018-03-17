import {
  RECEIVE_NOTIFICATIONS,
  REMOVE_NOTIFICATIONS,
  LOG_OUT,
} from '../constants/actionTypes'

const initialState = {
  notifications: [],
}

const notificationsReducer = (state=initialState, action) => {
  const { type, data } = action

  switch (type) {
    case RECEIVE_NOTIFICATIONS:
      if (data.notifications) return { ...state, notifications: data.notifications }
      if (data.notification) return { ...state, notifications: state.notifications.concat(data.notification)}
      console.log('lost noti data in notification redeucer')
      return state

    case REMOVE_NOTIFICATIONS:
      const index = state.notifications.findIndex(noti => noti._id === data.id)
      console.log({ data, index, notis: state.notifications})
      if (index !== -1) {
        return {
          ...state,
          notifications: [
            ...state.notifications.slice(0, index),
            ...state.notifications.slice(index+1),
          ]
        }
      }

      return state

    case LOG_OUT:
      return  initialState

    default:
      return state
  }
}

export default notificationsReducer
