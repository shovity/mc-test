// import { setWork } from '../actions/statusActions'
// import { SET_WORK, DONE_WORK } from '../constants/actionTypes'

const logger = store => next => action => {
  if (action.type) {
    console.log(action.type, action.data)

    // if (action.type !== SET_WORK && action.type !== DONE_WORK) {
    //   store.dispatch(setWork(action.type.toLowerCase())())
    // }
  }
  next(action)
}

export default logger
