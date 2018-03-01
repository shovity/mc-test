import { receiveToken, loginSocket } from './actions/authActions';
import { setWork, doneWork } from './actions/statusActions';
import { fetchUnread } from './actions/chatActions';

const boot = (store) => {
  const { token, username, level } = window.localStorage
  const { dispatch } = store

  if (token && username) {
    dispatch(receiveToken({ token, username, level }))
    dispatch(loginSocket())
    dispatch(fetchUnread())
  }

  // for fun
  const work = (name) => {
    return new Promise((resolve, reject) => {
      dispatch(setWork(name))
      setTimeout(() => {
        dispatch(doneWork)
        console.log(name)
        resolve()
      }, Math.random()*100 + 400)
    })
  }

  (async () => {
    await work('connect to server ...')
    await work('connect to server ...')
    await work('authenticating ...')
    await work('sync preferences ...')
    await work('get data analytic ...')
    await work('looking local config ...')
  })()

}

export default boot
