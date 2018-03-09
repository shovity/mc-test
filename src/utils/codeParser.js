import React from 'react'
import { Link } from 'react-router-dom'

const codeParser = (raw) => {
  const components = raw.split(/\[.+?\]/)
  if (components.length === 1) return raw

  const code = raw.match(/\[test:(.+?)\]/)[1]

  return (
    <div>
      {components[0]}
      <Link to={`/test-detail/${code}`} className="code">{code}</Link>
      {components[1]}
    </div>
  )
}


export default codeParser
