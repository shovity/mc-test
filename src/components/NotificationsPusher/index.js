import React, { Component } from 'react'
import { connect } from 'react-redux'

import Toggle from '../cells/Toggle'
import { pushNotifications } from '../../actions/notificationsActions'

import './style.css'

class NotificationsPusher extends Component {
  state = {
    allUser: true,
    filter: "",
  }

  togglePushAllUsers() {
    this.setState({ allUser: !this.state.allUser })
  }

  handleChangeFilter({ target }) {
    this.setState({ filter: target.value })
  }

  handlePushNotifications() {
    const { content, title } = this.refs
    this.props.push(title.value, content.value, "")
    title.value = ""
    content.value = ""
  }

  render() {
    return (
      <div id="np">
        <h2>Notifications pusher</h2>
        <Toggle
          isOn={this.state.allUser}
          toggle={this.togglePushAllUsers.bind(this)}
        />

        Push to all members

        { !this.state.allUser &&
          <div>
            <h3>Push filter</h3>
            <input
              value={this.state.filter}
              onChange={this.handleChangeFilter.bind(this)}
            />
          </div>
        }
        <h3>Title</h3>
        <input type="text" ref="title"/>
        <h3>Notifications content</h3>
        <textarea ref="content"></textarea>
        <button className="btn btn-primary" onClick={this.handlePushNotifications.bind(this)}>Push</button>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    push: (title, content, filter) => dispatch(pushNotifications(title, content, filter))
  }
}

NotificationsPusher = connect(mapStateToProps, mapDispatchToProps)(NotificationsPusher)

export default NotificationsPusher
