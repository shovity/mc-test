import React, { Component } from 'react';

import Main from './Main';
import Navbar from './Navbar'
import SideBar from './SideBar'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isNavbarOpen: true
    }

    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  toggleNavbar() {
    this.setState({ isNavbarOpen: !this.state.isNavbarOpen })
  }

  render() {
    const { isNavbarOpen } = this.state
    return (
      <div>
        <Navbar isOpen={isNavbarOpen} toggle={this.toggleNavbar} />
        <SideBar isOpen={isNavbarOpen}/>
        <Main isExtra={!isNavbarOpen} /> { /* routing here */ }
      </div>
    );
  }
}

export default App;
