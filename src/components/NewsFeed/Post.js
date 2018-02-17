import React, { Component } from 'react'

import Comment from './Comment'

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
    const { post, avatar_base, avatar, username } = this.props
    const { comments } = post

    let listComments = <div></div>

    if (comments.length > 0) {
      listComments = comments.map((c, i) => <Comment
        key={i}
        comment={c}
        avatar_base={avatar_base}
        my_avatar={avatar}
        my_username={username}
      />)
    }

    return (
      <div className="post">
        <div className="title">
          <img src={avatar} alt="" className="avatar"/>
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
