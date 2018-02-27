import React from 'react'
import { NavLink } from 'react-router-dom'

const QuickAccess = ({ username }) => (
  <div>
    <li className="header">AUTHOR</li>

    <NavLink to='/add-question'>
      <li className="item"><i className="fa fa-plus"></i>Add question</li>
    </NavLink>

    <NavLink to='/create-test'>
      <li className="item"><i className="fa fa-superpowers"></i>Create test</li>
    </NavLink>
  </div>
)

export default QuickAccess
