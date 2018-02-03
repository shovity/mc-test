import React, { Component } from 'react'

import Comment from './Comment'
import avatarImage from '../../static/images/unknown-user.png'

class Post extends Component {

  constructor(props) {
    super(props)

    this.handleComment = this.handleComment.bind(this)
  }

  handleComment() {
    const { alert, comment, post, username } = this.props
    if (!this.refs.input.value) {
      alert('comment is null', 'danger', 1000)
    } else {
      comment(post._id, this.refs.input.value, username)
      // clear input
      this.refs.input.value = ''
    }
  }

  render() {
    const { post } = this.props
    const { comments } = post

    let listComments = <div></div>

    if (comments.length > 0) {
      listComments = comments.map((c, i) => <Comment key={i} comment={c} />)
    }

    return (
      <div className="post">
        <div className="title">
          <img src={avatarImage} alt="avatar" className="avatar"/>
          <strong className="name">{post.onwer}</strong>
        </div>

        <div className="content">
          {post.content}
        </div>

        <div className="comments">
          { listComments }
        </div>

        <div className="input">
          <input ref="input" type="text"/>
          <button onClick={this.handleComment} className="btn btn-send">SEND</button>
        </div>
      </div>
    )
  }
}

export default Post
