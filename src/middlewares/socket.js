/**
 *       client |                                    | server
 *  ----------- |                                    | ------------
 *  pick test   | -----emit make_quest/test--------> | find test
 *              |                                    | pick quest
 *              |                                    | list done
 *  render      | <-----emit start/quest------------ | emit timeout
 *  timer       |                                    |
 *  get answer  | ------emit answer/time-----------> |
 */
import websocket from 'socket.io-client'
import { setStatus } from '../actions/statusActions'
import { receiveMembers } from '../actions/membersActions'
import { receiveChatMessage } from '../actions/chatActions'

const socket = websocket()

// listen with middleware
socket.listen = (eventName, callback) => {
  socket.on(eventName, (data) => {
    const extend = {}
    callback({ ...data, ...extend })
  })
}

const socketMiddleWare = ({ dispatch, getState }) => {

  socket.listen('update users', (data) => {
    dispatch(receiveMembers(data))
  })

  socket.listen('connect', () => {
    dispatch(setStatus({ isConnected: true }))
  })

  socket.listen('disconnect', () => {
    dispatch(setStatus({ isConnected: false }))
  })

  socket.listen('send message', (data) => {
    console.log('receive message in soket middleware')
    dispatch(receiveChatMessage(data))
    // { err, message: { sender: username, content: message } }

  })

  // socket.listen('reconnect', () => {
  //   console.log('reconnected')
  // })
  //
  // socket.listen('reconnect_error', () => {
  //   console.log('reconnected error')
  // })

  // catch socket actions
  return next => action => {
    if (!action.socket) {
      next(action)
    } else {
      const { event, data } = action.socket
      const token = getState().auth.token
      socket.emit(event, { ...data, token })
    }
  }
}

export default socketMiddleWare
