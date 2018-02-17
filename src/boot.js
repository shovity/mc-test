import { receiveToken, loginSocket } from './actions/authActions';
import { setWork } from './actions/statusActions';
import { fetchUnread } from './actions/chatActions';

const boot = (store) => {
  const { token, username } = window.localStorage
  const { dispatch } = store

  if (token && username) {
    dispatch(receiveToken({ token, username }))
    dispatch(loginSocket())
    dispatch(fetchUnread())
    dispatch(setWork('Connect to server...'))
  }

}

export default boot
