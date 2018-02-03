import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import avatarImage from '../../static/images/unknown-user.png'

import './style.css'

const Dumb = ({ isOpen, isConnected, username, messageUs }) => {
  return (
    <div id="sidebar" className={isOpen? 'open' : ''}>
      <ul className="sidebar-menu">

        <li className="user-status">
          <img src={avatarImage} alt="" id="avatar" className="avatar"/>
          <div className="name-label">{username}</div>
          <i className={`fa fa-circle ${isConnected? 'online' : ''}`}></i>
        </li>

        <li>
          <input type="text" id="search" placeholder="search..."/>
        </li>

        <li className="header">QUICK ACCESS</li>

        <NavLink to='/home'>
          <li className="item"><i className="fa fa-home"></i>Home</li>
        </NavLink>

        <NavLink to='/news-feed'>
          <li className="item"><i className="fa fa-newspaper-o"></i>News Feed</li>
        </NavLink>

        <NavLink to={`/profile/${username}`}>
          <li className="item"><i className="fa fa-info-circle"></i>Profile</li>
        </NavLink>

        <NavLink to='/members'>
          <li className="item"><i className="fa fa-group"></i>Members</li>
        </NavLink>

        <NavLink to='/messages'>
          <li className="item"><i className="fa fa-envelope"></i>Messages</li>
        </NavLink>

        <NavLink to='/about'>
          <li className="item"><i className="fa fa-question-circle-o"></i>About</li>
        </NavLink>

        <li className="header">Other</li>

        <Link to='/test/1'>
          <li className="item"><i className="fa fa-newspaper-o"></i>Test 1</li>
        </Link>

        <a onClick={messageUs}>
          <li className="item"><i className="fa fa-send"></i>Message Us</li>
        </a>
      </ul>
    </div>
  )
}

export default Dumb
