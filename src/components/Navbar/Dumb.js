import React from 'react'
import { Link } from 'react-router-dom';

const Dumb = ({ username, toggle, isOpen, isLoading, currentWork }) => {
  return (
    <div id="navbar" className={isOpen? 'open' : ''}>
      <Link to='/home' className="logo-box"></Link>

      <i className="fa fa-bars menu" aria-hidden="true" onClick={toggle}></i>

      <div className="items-box"></div>

      <div>{currentWork}</div>

      <div className={`lds-css ng-scope ${isLoading? '' : 'hidden'}`}>
        <div className="lds-dual-ring">
          <div></div>
        </div>
      </div>

      <div className="user-box">
        <img src="/images/unknown-user.png" alt="" id="avatar" className="avatar"/>
        <div className="nameLabel">{username}</div>
      </div>
    </div>
  )
}

export default Dumb
