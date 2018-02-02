import { receiveToken, loginSocket } from './actions/authActions';
import { fetchUnread } from './actions/chatActions';

const boot = (store) => {
  const { token, username } = window.localStorage
  const { dispatch } = store

  if (token && username) {
    dispatch(receiveToken({ token, username }))
    dispatch(loginSocket())
    dispatch(fetchUnread())
  }

}

export default boot
