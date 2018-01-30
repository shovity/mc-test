import React from 'react'
import { NavLink } from 'react-router-dom';

import './style.css'

const Dumb = ({ isOpen }) => {
  return (
    <div id="sidebar" className={isOpen? 'open' : ''}>
      <ul className="sidebar-menu">
        <li className="header">QUICK ACCESS</li>

        <NavLink to='/home'>
          <li className="item"><i className="fa fa-newspaper-o"></i>Home</li>
        </NavLink>

        <NavLink to='/news1'>
          <li className="item"><i className="fa fa-newspaper-o"></i>News Feed</li>
        </NavLink>

        <li className="header">QUICK ACCESS</li>

        <NavLink to='/news2'>
          <li className="item"><i className="fa fa-newspaper-o"></i>News Feed</li>
        </NavLink>

        <NavLink to='/news3'>
          <li className="item"><i className="fa fa-newspaper-o"></i>News Feed</li>
        </NavLink>
      </ul>
    </div>
  )
}

export default Dumb
