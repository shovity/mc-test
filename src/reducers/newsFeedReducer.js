import {
  RECEIVE_POST, RECEIVE_COMMENT, LOG_OUT
} from '../constants/actionTypes'

const initialState = {
  posts: [],
}

const newsFeedReducer = (state=initialState, action) => {
  const data = action.data

  switch (action.type) {
    case RECEIVE_POST:
      const posts = data.posts || []
      return { ...state, posts }

    case RECEIVE_COMMENT:
      const { comment, id } = data
      console.log({ comment, id })
      if (comment && id) {
        const clonePosts = state.posts.slice()
        clonePosts.find(p => p._id === id).comments.push(comment)
        return {
          ...state,
          posts: clonePosts
        }
      } else {
        console.error('RECEIVE_COMMENT with lost id or comment')
        return state
      }

    default:
      return state
  }
}

export default newsFeedReducer
