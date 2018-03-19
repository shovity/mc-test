import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from 'recharts'

import { putProfile, fetchUserInfo } from '../../actions/userActions'

import './style.css';

const data = [
  { subject: 'Foreign Language', value: 110, fullMark: 150 },
  { subject: 'Other', value: 98, fullMark: 150 },
  { subject: 'Science', value: 99, fullMark: 150 },
  { subject: 'Society', value: 86, fullMark: 150 },
  { subject: 'Physics', value: 85, fullMark: 150 },
]


class Profile extends Component {

  constructor(props) {
    super(props)

    this.state = {
        status: '',
        created_date: '',
        dob: '',
        email: '',
        address: '',
        full_name: '',
        level: '',
        phone: '',
    }

    this.handlePutData = this.handlePutData.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleChangeInput = this.handleChangeInput.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const name = this.props.match.params.name
    const newName = nextProps.match.params.name

    if (name !== newName) {
      this.props.fetchUserInfo(newName)
    }

    const userInfo = nextProps.userInfo
    if (userInfo) {
      this.setState({
        status: userInfo.status || '',
        address: userInfo.address || '',
        created_date: userInfo.created_date || '',
        dob: userInfo.dob || '',
        email: userInfo.email || '',
        full_name: userInfo.full_name || '',
        level: userInfo.level || '',
        phone: userInfo.phone || '',
      })
    }

  }

  componentDidMount() {
    const { name } = this.props.match.params
    this.props.fetchUserInfo(name)
  }

  handleChangeInput(name) {
    return ({ target }) => {
      const dump = {}
      dump[name] = target.value
      this.setState(dump)
    }
  }

  handlePutData() {
    const formData = new FormData();

    const info = {}
    info.username = this.props.match.params.name
    if (this.state.status) info.status = this.state.status
    if (this.state.address) info.address = this.state.address
    if (this.state.dob) info.dob = this.state.dob
    if (this.state.email) info.email = this.state.email
    if (this.state.full_name) info.full_name = this.state.full_name
    if (this.state.phone) info.phone = this.state.phone

    // formData.append('username', 'abc123');
    formData.append('avatar', this.refs.inputAvatar.files[0]);
    formData.append('info', JSON.stringify(info));


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
    const { my_username, my_avatar, userInfo, avatar_base, members } = this.props
    const { status, phone, email, full_name, address } = this.state



    let {
      username = 'Guest',
      avatar = username===my_username? my_avatar : avatar_base + username
    } = userInfo || {}

    const editAble = username === my_username

    const isOnline = !!members.find(u => u.username === username)

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

          <Chart data={data}/>
          <div className="info-text">
            <table>
              <tbody>
                <tr>
                  <td className="i-username">
                    <strong>{ username }</strong>
                    <i className={`fa fa-circle ${isOnline? 'online' : ''}`}></i>
                  </td>
                </tr>
                <tr>
                  <td><i>{ status }</i></td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>


        <div className="edit-row">
          <label htmlFor="">Status</label>
          <input value={status} onChange={this.handleChangeInput('status')} disabled={!editAble}/>

          <label htmlFor="">Full Name</label>
          <input value={full_name} onChange={this.handleChangeInput('full_name')} disabled={!editAble}/>

          <label htmlFor="">Address</label>
          <input value={address} onChange={this.handleChangeInput('address')} disabled={!editAble}/>

          <label htmlFor="">Email</label>
          <input value={email} onChange={this.handleChangeInput('email')} disabled={!editAble}/>

          <label htmlFor="">Phone</label>
          <input value={phone} onChange={this.handleChangeInput('phone')} disabled={!editAble}/>

        </div>
        { editAble &&
          <button className="btn btn-primary" onClick={this.handlePutData}>Update</button>
        }
      </div>
    );
  }

}

const Chart = ({ data }) => {
  return (
    <div className="chart">
      <RadarChart
        cy={130}
        width={330}
        height={234}
        data={data}
        innerRadius={10}
        outerRadius={100}>

        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <Radar name="Mike" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
      </RadarChart>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    my_username: state.auth.username,
    my_avatar: state.auth.avatar,
    avatar_base: state.auth.avatar_base,
    userInfo: state.user.userInfo,
    members: state.members.members,
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
