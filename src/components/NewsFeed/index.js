import React, { Component } from 'react'
import { connect } from 'react-redux'

import { requestSendPost } from '../../actions/newsFeedActions'

import Dumb from './Dumb'
import './style.css'

class NewsFeed extends Component {

  render() {
    const { post, username } = this.props

    return (
      <Dumb
      post={post}
      username={username}
      />
    )
  }
}

const mapStateToProp = (state) => {
  return {
    username: state.auth.username
  }
}

const mapDispatchToProp = (dispatch) => {
  return {
    post: (content) => dispatch(requestSendPost(content))
  }
}

NewsFeed = connect(mapStateToProp, mapDispatchToProp)(NewsFeed)

export default NewsFeed
