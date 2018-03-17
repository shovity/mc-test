import React from 'react'
import { Link } from 'react-router-dom'

const Other = ({ messageUs }) => (
  <div>
    <li className="header">OHTER</li>

    <Link to='/about'>
      <li className="item"><i className="fa fa-info"></i>About</li>
    </Link>
    <a onClick={messageUs}>
      <li className="item"><i className="fa fa-send"></i>Message Us</li>
    </a>
  </div>
)

export default Other
