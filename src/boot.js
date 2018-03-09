import { receiveToken, loginSocket } from './actions/authActions'
import { setWork, doneWork } from './actions/statusActions'
import { fetchUnread } from './actions/chatActions'

const boot = (store) => {
  const { token, username, level } = window.localStorage
  const { dispatch } = store

  if (token && username) {
    dispatch(receiveToken({ token, username, level }))
    dispatch(loginSocket())
    dispatch(fetchUnread())
  }

  // for fun
  const work = (name) => new Promise((resolve, reject) => {
    dispatch(setWork(name))
    setTimeout(() => {
      dispatch(doneWork)
      resolve()
    }, Math.random()*500 + 100)
  })

  const working = async (works) => {
    for (let i = 0, l = works.length; i < l; i++) {
      await work(works[i])
    }
  }

  working([
    'connect to server ...',
    'connect to server ...',
    'authenticating ...',
    'get secret key client ...',
    'sync preferences ...',
    'get data analytic ...',
    'looking local config ...',
  ])
}

export default boot
