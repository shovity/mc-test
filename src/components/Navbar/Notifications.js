import React, { Component } from 'react'
import  { connect } from 'react-redux'
import Modal from '../cells/Modal'

class Notifications extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isShowPopup: false,
      isOpenModal: false,
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

  selectNoti() {
    this.toggleModal('open')
  }

  render() {
    const notis = [ 'test notification' ]

    return (
      <div>
        <i className='fa fa-globe menu' onClick={this.toggleShowPopup}>
          <span className={`${notis.length!==0? 'label' : 'hide'} l-noti`}>{notis.length}</span>
          { this.state.isShowPopup && <Popup select={this.selectNoti.bind(this)} /> }
        </i>
        <Modal isOpen={this.state.isOpenModal} close={this.toggleModal.bind(this, 'close')} title="Title notification">
          <div className="noti-content">
            <strong>Whoops! </strong>
            Lorem ipsum dolor sit amet, <span className="code">code-embed</span> consectetur adipisicing elit. Quibusdam dolorum doloremque non eveniet tempore fugiat totam, labore odio quos ullam delectus. Doloribus quaerat amet fuga tempora reprehenderit consectetur, quam ad.
          </div>
        </Modal>
      </div>
    );
  }

}

const Popup = ({ select }) => {
  return (
    <div className="pop-up">
      <ul>
        <li onClick={select}>test_noti</li>
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

Notifications = connect(mapStateToProps, mapDispatchToProps)(Notifications)

export default Notifications;
