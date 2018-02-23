import React from 'react'
import { NavLink } from 'react-router-dom'

const QuickAccess = ({ username }) => (
  <div>
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
  </div>
)

export default QuickAccess
