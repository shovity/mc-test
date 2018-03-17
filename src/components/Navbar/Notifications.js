import React, { Component } from 'react'
import  { connect } from 'react-redux'
import Modal from '../cells/Modal'

import { requestReadedNotifications } from '../../actions/notificationsActions'

class Notifications extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isShowPopup: false,
      isOpenModal: false,
      noti: {},
    }

    this.toggleShowPopup = this.toggleShowPopup.bind(this)
  }

  toggleShowPopup() {
    this.setState({
      isShowPopup: !this.state.isShowPopup,
    })
  }

  toggleModal(type) {
    const isOpenModal = type==='close'? false : type==='open'? true : !this.state.isOpenModal
    this.setState({ isOpenModal })
  }

  selectNoti(noti) {
    return () => {
      this.setState({ noti })
      this.toggleModal('open')
    }
  }

  handleRemove() {
    this.props.remove(this.state.noti._id)
    this.toggleModal('close')
  }

  render() {
    const { notis } = this.props
    const { noti } = this.state

    return (
      <div>
        <i className='fa fa-globe menu' onClick={this.toggleShowPopup}>
          <span className={`${notis.length!==0? 'label' : 'hide'} l-noti`}>{notis.length}</span>
          { this.state.isShowPopup && <Popup notis={notis} select={this.selectNoti.bind(this)} /> }
        </i>
        <Modal isOpen={this.state.isOpenModal} close={this.toggleModal.bind(this, 'close')} title={noti.title}>
          <div className="noti-content">
            { noti.content}
            <div className="notim-footer">
              <button className="btn btn-danger" onClick={this.handleRemove.bind(this)}>Remove</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

}

const Popup = ({ select, notis }) => {
  const listItem = notis.map((noti, index) => {
    return <li key={index} onClick={select(noti)}>{ noti.title }</li>
  })

  return (
    <div className="pop-up">
      <ul>
        { listItem }
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notis: state.notifications.notifications,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    remove: (id) => dispatch(requestReadedNotifications(id)),
  }
}

Notifications = connect(mapStateToProps, mapDispatchToProps)(Notifications)

export default Notifications;
