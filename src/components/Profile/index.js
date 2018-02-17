import React, { Component } from 'react';
import { connect } from 'react-redux'

import { putProfile } from '../../actions/userActions'

import Dumb from './Dumb.js';
import './style.css';


class Profile extends Component {

  constructor(props) {
    super(props)

    this.handlePutData = this.handlePutData.bind(this)
  }

  handlePutData() {
    var formData = new FormData();
    var fileField = document.querySelector("input[type='file']");

    formData.append('username', 'abc123');
    formData.append('avatar', fileField.files[0]);

    this.props.putProfile(formData)
  }


  render() {
    const { username, avatar } = this.props

    return (
      <div>
        <Dumb
          username={username}
          avatar={avatar}
        />
        <input ref="inputFile" type="file" name="avatar" />
        <button onClick={this.handlePutData}>up</button>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    avatar: state.auth.avatar,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    putProfile: (body) => dispatch(putProfile(body))
  }

}

Profile = connect(mapStateToProps, mapDispatchToProps)(Profile)

export default Profile;
