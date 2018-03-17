import { pushAlert, setWork, doneWork } from './statusActions'
import { RECEIVE_NOTIFICATIONS, REMOVE_NOTIFICATIONS } from '../constants/actionTypes'

export const fetchNotifications = () => {
  return {
    call: {
      path: 'notifications',
      start_calls: [ setWork('fetch notifications') ],
      success_calls: [ receiveNotifications, doneWork ],
      error_calls: [ pushAlert, doneWork ],
    }
  }
}

export const requestReadedNotifications = (id) => {
  return {
    call: {
      path: 'notifications',
      method: 'put',
      body: { id },
      start_calls: [ removeNotifications({ id }), setWork('request readed notification') ],
      success_calls: [ doneWork ],
      error_calls: [ pushAlert, doneWork ],
    }
  }
}

export const pushNotifications = (title, content, filter) => {
  return {
    socket: {
      event: 'notifications push',
      data: { title, content, filter },
      start_calls: [ pushAlert('push notifications success!', 'success') ]
    }
  }
}

export const receiveNotifications = data => {
  return {
    type: RECEIVE_NOTIFICATIONS,
    data,
  }
}

export const removeNotifications = (data) => {
  return {
    type: REMOVE_NOTIFICATIONS,
    data,
  }
}
