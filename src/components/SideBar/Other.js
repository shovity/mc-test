import React from 'react'
import { Link } from 'react-router-dom'

const Other = ({ messageUs }) => (
  <div>
    <li className="header">OTHER</li>

    <a onClick={messageUs}>
      <li className="item"><i className="fa fa-send"></i>Message Us</li>
    </a>

    
    <Link to='/about'>
      <li className="item"><i className="fa fa-question-circle-o"></i>About</li>
    </Link>
  </div>
)

export default Other
