import React from 'react'
import { NavLink } from 'react-router-dom'

const Admin = ({ messageUs }) => (
  <div>
    <li className="header">ADMIN</li>

    <NavLink to='/notifications-pusher'>
      <li className="item"><i className="fa fa-feed"></i>Notifications Pusher</li>
    </NavLink>
    <NavLink to='/dashboard'>
      <li className="item"><i className="fa fa-dashboard"></i>Dashboard</li>
    </NavLink>
  </div>
)

export default Admin
