import React, { Component } from 'react';
import { connect } from 'react-redux'

import { putProfile, fetchUserInfo } from '../../actions/userActions'

import './style.css';


class Profile extends Component {

  constructor(props) {
    super(props)

    this.handlePutData = this.handlePutData.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount() {
    const { name } = this.props.match.params
    this.props.fetchUserInfo(name)
  }

  handlePutData() {
    const formData = new FormData();

    // formData.append('username', 'abc123');
    formData.append('avatar', this.refs.inputAvatar.files[0]);

    this.props.putProfile(formData)
  }

  handleInputChange(e) {
    const input = this.refs.inputAvatar
    if (input.files && input.files[0]) {
      const reader = new FileReader()
      reader.onload = e => {
        this.refs.avatarBox.style.backgroundImage = `url(${e.target.result})`
      }
      reader.readAsDataURL(input.files[0])
    }
  }


  render() {
    const { my_username, my_avatar, userInfo, avatar_base } = this.props

    let {
      username = 'Guest',
      status = 'Status',
      avatar = username===my_username? my_avatar : avatar_base + username
    } = userInfo || {}

    const editAble = username === my_username

    return (
      <div id='profile'>
        <div className="info-row">
          <div
            className="avatar-box"
            ref="avatarBox"
            style={{ backgroundImage: avatar? `url(${avatar})` : '' }}>

            { editAble && <div className="overlay">
              <label htmlFor="inputFile">
                <i className="fa fa-edit"></i>
              </label>
              <input id="inputFile" ref="inputAvatar" onChange={this.handleInputChange} type="file" name="avatar" />
            </div> }

          </div>

          <div className="info-text">
            <div className="username">{username}</div>
            <div className="status">{status}</div>
            <div className="account-type">Account type</div>
            <div className="point">Points</div>
            <div className="description">
              Description Lorem ipsum dolor sit amet, consectetur adipisicing.
            </div>
          </div>
        </div>


        <div className="edit-row">
          <label htmlFor="">Status</label>
          <input ref="inputStatus"/>

          <label htmlFor="">Address</label>
          <input ref="inputAddress"/>

          <label htmlFor="">Email</label>
          <input ref="inputEmail"/>

          <label htmlFor="">Username</label>
          <input ref="inputUsername"/>

          <label htmlFor="">Phone</label>
          <input ref="inputPhone"/>

        </div>
        <button className="btn btn-primary" onClick={this.handlePutData}>Update</button>
      </div>


    );
  }

}

const mapStateToProps = (state) => {
  return {
    my_username: state.auth.username,
    my_avatar: state.auth.avatar,
    avatar_base: state.auth.avatar_base,
    userInfo: state.user.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    putProfile: (body) => dispatch(putProfile(body)),
    fetchUserInfo: username => dispatch(fetchUserInfo(username)),
  }

}

Profile = connect(mapStateToProps, mapDispatchToProps)(Profile)

export default Profile;
