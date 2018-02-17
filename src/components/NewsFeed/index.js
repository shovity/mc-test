import React, { Component } from 'react'
import { connect } from 'react-redux'

import { requestSendPost, fetchPost, sendComment } from '../../actions/newsFeedActions'
import { pushAlert } from '../../actions/statusActions'

import Post from './Post'
import './style.css'

class NewsFeed extends Component {

  constructor(props) {
    super(props)

    this.handlePost = this.handlePost.bind(this)
  }

  componentDidMount() {
    this.props.fetchPost()
  }

  handlePost() {
    const { post,  alert } = this.props
    const message = this.refs.input.value

    if (message === '') {
      alert('post message is null', 'danger')
    } else {
      post(message)
      // cleam input
      this.refs.input.value = ''
    }
  }

  render() {
    const { posts, alert, comment, username, avatar, avatar_base } = this.props

    let postList = <div>Loading...</div>

    if (posts.length > 0) {
      postList = posts.map((p, i) => {
        return (
          <Post
            key={i}
            post={p}
            alert={alert}
            comment={comment}
            username={username}
            avatar={avatar}
            avatar_base={avatar_base}
          />
        )
      })
    }

    return (
      <div id="newsFeed">
        <div className="posts">
          <h2>Share a post for everyone</h2>
          <div className="post-box">
            <textarea ref="input" placeholder="Post's content..."></textarea>
            <button onClick={this.handlePost} className="btn btn-success btn-post">POST</button>
          </div>

          { postList }
        </div>
      </div>
    )
  }
}

const mapStateToProp = (state) => {
  return {
    username: state.auth.username,
    posts: state.newsFeed.posts,
    avatar_base: state.auth.avatar_base,
    avatar: state.auth.avatar,
  }
}

const mapDispatchToProp = (dispatch) => {
  return {
    post: (content) => dispatch(requestSendPost(content)),
    alert: (message, type, time) => dispatch(pushAlert(message, type, time)),
    fetchPost: (query) => dispatch(fetchPost(query)),
    comment: (id, content, username) => dispatch(sendComment(id, content, username))
  }
}

NewsFeed = connect(mapStateToProp, mapDispatchToProp)(NewsFeed)

export default NewsFeed
