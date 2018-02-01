import React, { Component } from 'react'
import  { connect } from 'react-redux'
import { fetchChatHistory } from '../../actions/chatActions'

class RecentMessage extends Component {

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
    const { unreads, members, sendMessage } = this.props
    return (
      <i className='fa fa-envelope-o menu' onClick={this.toggleShowPopup}>
        <span className={`${unreads.length!==0? 'label' : 'hide'}`}>{unreads.length}</span>
        { this.state.isShowPopup && <Popup unreads={unreads} members={members} sendMessage={sendMessage} /> }
      </i>
    );
  }

}

const Popup = ({ unreads, members, sendMessage }) => {
  let list = <li><div>no_message</div></li>

  if (unreads.length > 0) {
    list = unreads.map(u => {
      return (
        <li onClick={() => sendMessage(u)}>
          <div className="unread-name">{u}</div>
          <i className={`fa fa-circle ${members.find(m => m.username === u)? 'online' : ''}`}></i>
        </li>
      )
   })
  }

  return (
    <div className="pop-up">
      <ul>
        { list }
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    unreads: state.chat.unreads,
    members: state.members.members
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (target) => dispatch(fetchChatHistory(target))
  }
}

RecentMessage = connect(mapStateToProps, mapDispatchToProps)(RecentMessage)

export default RecentMessage;
