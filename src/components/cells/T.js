import React, { Component } from 'react'

import Toggle from './Toggle'


class T extends Component {

  state = { isOn : true }

  toggle() {
    this.setState({ isOn: !this.state.isOn })
  }

  render() {
    return (
      <div>
        <Toggle toggle={this.toggle.bind(this)} isOn={this.state.isOn} />
      </div>
    )
  }

}

export default T
