/**
 * SOCKET MIDDLEWARE
 * action - { socket: { event, payload } }
 */

import websocket from 'socket.io-client'
import { setStatus, pushAlert } from '../actions/statusActions'
import { receiveMembers } from '../actions/membersActions'
import { receiveChatMessage } from '../actions/chatActions'
import { receiveQuestion, testFinished } from '../actions/testActions'
import { receiveNotifications } from '../actions/notificationsActions'

const socket = websocket()

const socketMiddleWare = ({ dispatch, getState }) => {
  socket.on('err', (data) => {
    dispatch(pushAlert(data))
  })

  socket.on('update users', (data) => {
    dispatch(receiveMembers(data))
  })

  socket.on('connect', () => {
    dispatch(setStatus({ isConnected: true }))
  })

  socket.on('disconnect', () => {
    dispatch(setStatus({ isConnected: false }))
  })

  socket.on('send message', (data) => {
    dispatch(receiveChatMessage(data))
  })

  socket.on('fetch question', (data) => {
    dispatch(receiveQuestion(data))
  })

  socket.on('test finished', (data) => {
    dispatch(testFinished(data))
  })

  socket.on('notifications push', (data) => {
    dispatch(receiveNotifications(data))
  })

  // catch socket actions
  return next => action => {
    if (!action.socket) {
      next(action)
    } else {
      const { event, data, start_calls } = action.socket
      const token = getState().auth.token
      dispatch({ call: { start_calls } })
      socket.emit(event, { ...data, token })
    }
  }
}

export default socketMiddleWare
