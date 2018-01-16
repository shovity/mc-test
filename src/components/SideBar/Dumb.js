import React from 'react'

import './style.css'

const Dumb = ({ isOpen }) => {
  return (
    <div id="sidebar" className={isOpen? 'open' : ''}>
      <ul className="sidebar-menu">
        <li className="header">QUICK ACCESS</li>
        <li className="item active">News Feed</li>
        <li className="item">Test Now</li>
      </ul>
    </div>
  )
}

export default Dumb
