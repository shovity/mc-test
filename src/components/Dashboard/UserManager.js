import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Modal from '../cells/Modal'
import Toggle from '../cells/Toggle'
import { pushAlert} from '../../actions/statusActions'
import { fetchAllMembers } from '../../actions/membersActions'

class UserManager extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isOpenModal: false,
      userInModal: {},
    }

    this.closeModel = this.closeModel.bind(this)
    this.showModal = this.showModal.bind(this)
    this.handleOnChangeLevel = this.handleOnChangeLevel.bind(this)
    this.handleToggleBanned = this.handleToggleBanned.bind(this)
  }

  componentDidMount() {
    this.props.fetchAllMembers()
  }

  closeModel() {
    this.setState({ isOpenModal: false })
  }

  showModal(userInModal) {
    this.setState({ userInModal, isOpenModal: true })
  }

  handleOnChangeLevel(event) {
    this.setState({
      userInModal: {
        ...this.state.userInModal,
        level: event.target.value,
      },
    })
  }

  handleToggleBanned() {
    this.setState({
      userInModal: {
        ...this.state.userInModal,
        level: this.state.userInModal.level === -1? this.state.userInModal.cacheLevel : -1,
        cacheLevel: this.state.userInModal.level === -1? 21 : this.state.userInModal.level
      },
    })
  }


  render() {
    const { allMembers, members } = this.props
    const { isOpenModal, userInModal } = this.state

    const listUsers = allMembers.map((user, index) => {
      const isOnline = !!members.find(m => m.username === user.username)
      return (
        <div key={index}>
          <div className="item" onClick={() => this.showModal(user)}>
            <i className={`fa fa-circle ${isOnline && 'online'}`}></i>
           {user.username}
          </div>
        </div>
      )
    })

    return (
      <div>
        <label>Filter</label>
        <input />
        <label>List Users <span className="hint">(click to edit)</span></label>
        <div className="list-users">
          { listUsers }
        </div>

        <Modal close={this.closeModel} isOpen={isOpenModal} title={`Edit user ${userInModal.username}`}>
          <table>
            <tbody>
              <tr>
                <td>level = -1</td>
                <td>Banned</td>
              </tr>
              <tr>
                <td>-1 &lt; level &lt; 11</td>
                <td>Admin</td>
              </tr>
              <tr>
                <td>10 &lt; level &lt; 21</td>
                <td>Author</td>
              </tr>
              <tr>
                <td>20 &lt; level</td>
                <td>Normal user</td>
              </tr>
            </tbody>
          </table>
          <label>Level</label>
          <input type="number" value={userInModal.level} onChange={this.handleOnChangeLevel}/>
          <Toggle isOn={userInModal.level === -1} toggle={this.handleToggleBanned}/> Banned
          <div className="footer">
            <Link className="btn btn-info" to={`/profile/${userInModal.username}`}>Profile</Link>
            <button className="btn btn-primary">Edit user</button>
          </div>
        </Modal>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    allMembers: state.members.allMembers,
    members: state.members.members,
  }
}

const mapDispatchToProp = (dispatch) => {
  return {
    fetchAllMembers: () => dispatch(fetchAllMembers()),
    pushAlert: (message, type, time) => dispatch(pushAlert(message, type, time)),
  }
}

UserManager = connect(mapStateToProps, mapDispatchToProp)(UserManager)

export default UserManager
