import React, { Component } from 'react'

import './style.css'

class Home extends Component {
  render() {
    return (
      <div id="home">
        <div className="card-box">
          <div className="c1">
            <div className="card c1-h">HEADER COL 1</div>
            <Card />
            <Card />
            <Card />
          </div>

          <div className="c2">
            <div className="card c2-h">HEADER COL 2</div>
            <Card />
            <Card />
            <Card />
          </div>

          <div className="c3">
            <div className="card c3-h">HEADER COL 3</div>
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    )
  }
}

const Card = () => {
  return (
    <div className="card">
      Test item
    </div>
  )
}

export default Home
