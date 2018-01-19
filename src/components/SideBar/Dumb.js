import React from 'react'
import { Link } from 'react-router-dom';

import './style.css'

const Dumb = ({ isOpen }) => {
  return (
    <div id="sidebar" className={isOpen? 'open' : ''}>
      <ul className="sidebar-menu">
        <li className="header">QUICK ACCESS</li>

        <Link to='/news'>
          <li className="item"><i className="fa fa-newspaper-o"></i>News Feed</li>
        </Link>

        <Link to='/news'>
          <li className="item"><i className="fa fa-newspaper-o"></i>News Feed</li>
        </Link>

        <li className="header">QUICK ACCESS</li>

        <Link to='/news'>
          <li className="item"><i className="fa fa-newspaper-o"></i>News Feed</li>
        </Link>

        <Link to='/news'>
          <li className="item"><i className="fa fa-newspaper-o"></i>News Feed</li>
        </Link>
      </ul>
    </div>
  )
}

export default Dumb
