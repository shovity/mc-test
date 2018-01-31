import {
  RECEIVE_POST, RECEIVE_COMMENT
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

    case RECEIVE_COMMENT:
      const { comment, id } = data
      if (comment && id) {
        const clonePosts = state.posts.slice()
        clonePosts.find(p => p._id === id).comments.push(comment)
        console.log(clonePosts)
        console.log(clonePosts.find(p => p._id === id).comments)
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
