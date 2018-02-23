import React from 'react'
import { Link } from 'react-router-dom'

const QuickAccess = ({ username }) => (
  <div>
    <li className="header">AUTHOR</li>

    <Link to='/add-question'>
      <li className="item"><i className="fa fa-plus"></i>Add question</li>
    </Link>

    <Link to='/create-test'>
      <li className="item"><i className="fa fa-superpowers"></i>Create test</li>
    </Link>
  </div>
)

export default QuickAccess
