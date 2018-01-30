import {
  RECEIVE_POST
} from '../constants/actionTypes'

const initialNewsFeedState = {
  posts: []
}

const newsFeedReducer = (state=initialNewsFeedState, action) => {
  const data = action.data

  switch (action.type) {
    case RECEIVE_POST:
      const posts = data.posts || []
      return { ...state, posts}

    default:
      return state
  }
}

export default newsFeedReducer
