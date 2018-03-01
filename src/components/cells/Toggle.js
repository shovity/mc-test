import React, { Component } from 'react'

class Toggle extends Component {

  render() {
    const { toggle, isOn, className } = this.props

    return (
      <div
        className={className || ''}
        style={{
          verticalAlign: "middle",
          marginRight: "5px",
          display: 'inline-block',
          width: "40px",
          height: "20px",
          borderRadius: "2px",
          backgroundColor: `${isOn? 'rgb(1, 124, 66)' : '#737373'}`,
          userSelect: "none",
          padding: "2px",
          cursor: "pointer",
        }}
        onClick={toggle}>
        <div style={{
          backgroundColor: "#fff",
          borderRadius: "2px",
          width: "16px",
          height: "16px",
          transition: "transform .2s ease-in-out",
          transform: `translateX(${isOn? '0' : '20px'})`,
        }}></div>
      </div>
    )
  }
}

export default Toggle
