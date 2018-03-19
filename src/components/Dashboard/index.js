import React, { Component } from 'react'

import './style.css'

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tab: 1,
    }

    this.selectTab = this.selectTab.bind(this)
  }

  selectTab(tab) {
    this.setState({
      tab,
    })
  }

  renderTab(tab) {
    switch (tab) {
      case 1:
        return <div>1</div>
      default:
        return <div>none tab</div>
    }
  }

  render() {
    const currentTab = this.state.tab
    const tab = this.renderTab(currentTab)

    return (
      <div id="db">
        <div className="db-nav">
          <div className={`${currentTab === 1 && 'active'}`} onClick={this.selectTab.bind(this, 1)}>User manager</div>
          <div className={`${currentTab === 2 && 'active'}`} onClick={this.selectTab.bind(this, 2)}>Test manager</div>
          <div className={`${currentTab === 3 && 'active'}`} onClick={this.selectTab.bind(this, 3)}>Policys</div>
          <div className={`${currentTab === 4 && 'active'}`} onClick={this.selectTab.bind(this, 4)}>Settings</div>
          <div className={`${currentTab === 5 && 'active'}`} onClick={this.selectTab.bind(this, 5)}>orhter tab</div>
        </div>

        <div className="db-content">
          { tab }
        </div>
      </div>
    )
  }

}

export default Dashboard
