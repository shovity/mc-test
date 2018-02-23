import React from 'react'
import { Link } from 'react-router-dom'

const Other = ({ messageUs }) => (
  <div>
    <li className="header">OTHER</li>

    <a onClick={messageUs}>
      <li className="item"><i className="fa fa-send"></i>Message Us</li>
    </a>
  </div>
)

export default Other
