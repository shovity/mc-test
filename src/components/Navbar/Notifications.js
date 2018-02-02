import React, { Component } from 'react'
import  { connect } from 'react-redux'

class Notifications extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isShowPopup: false
    }

    this.toggleShowPopup = this.toggleShowPopup.bind(this)
  }

  toggleShowPopup() {
    this.setState({
      isShowPopup: !this.state.isShowPopup
    })
  }

  render() {
    return (
      <i className='fa fa-globe menu' onClick={this.toggleShowPopup}>
        <span className={`${false? 'label' : 'hide'}`}>{0}</span>
        { this.state.isShowPopup && <Popup /> }
      </i>
    );
  }

}

const Popup = () => {
  return (
    <div className="pop-up">
      <ul>
        <li>no_notifications</li>
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
