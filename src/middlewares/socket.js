import websocket from 'socket.io-client'
import { setStatus } from '../actions/statusActions'

const socket = websocket()

const socketMiddleWare = ({ dispatch }) => {

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

  // return a middle ware handle
  return next => action => {
    if (!action.socket) {
      next(action)
    } else {
      const { event, data } = action.socket
      socket.emit(event, data)
    }
  }
}

export default socketMiddleWare
