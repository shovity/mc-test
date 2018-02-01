import websocket from 'socket.io-client'
import { setStatus } from '../actions/statusActions'
import { receiveMembers } from '../actions/membersActions'

const socket = websocket()

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
const socketMiddleWare = ({ dispatch, getState }) => {

  socket.on('update users', (data) => {
    dispatch(receiveMembers(data))
  })

  socket.on('connect', () => {
    dispatch(setStatus({ isConnected: true }))
  })

  socket.on('disconnect', () => {
    dispatch(setStatus({ isConnected: false }))
  })

  // socket.on('reconnect', () => {
  //   console.log('reconnected')
  // })
  //
  // socket.on('reconnect_error', () => {
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
