import { receiveToken } from './actions/authActions';

const boot = (store) => {
  const { token, username } = window.localStorage
  const { dispatch } = store

  if (token && username) {
    dispatch(receiveToken({ token, username }))
  }

}

export default boot
