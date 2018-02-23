import React, { Component } from 'react'

import Comment from './Comment'
import codeParser from '../../codeParser'

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
    const { post, avatar_base, my_avatar, username } = this.props
    const { comments } = post
      const avatar = username===post.onwer? my_avatar : avatar_base + post.onwer;

    let listComments = <div></div>

    if (comments.length > 0) {
      listComments = comments.map((c, i) => <Comment
        key={i}
        comment={c}
        avatar_base={avatar_base}
        my_avatar={my_avatar}
        username={username}
      />)
    }

    return (
      <div className="post">
        <div className="title">
          <img src={avatar} alt="" className="avatar"/>
          <strong className="name">{post.onwer}</strong>
          <i className="fa fa-chevron-up"><span>100</span></i>
          <i className="fa fa-chevron-down"><span>12</span></i>
        </div>

        <div className="content">
          {codeParser(post.content)}
        </div>

        <div className="comments">
          { listComments }
        </div>

        <div className="input">
          <input ref="input" type="text" placeholder="Write your comment ..."/>
          <button onClick={this.handleComment} className="btn btn-send">SEND</button>
        </div>
      </div>
    )
  }
}

export default Post
