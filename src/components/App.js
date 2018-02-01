import React, { Component } from 'react';

import Main from './Main';
import Navbar from './Navbar'
import SideBar from './SideBar'
import Alert from './Alert'
import Chat from './Chat'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isNavbarOpen: true
    }

    setTimeout(() => {
      this.setState({ isNavbarOpen: false })
    }, 600)

    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  toggleNavbar() {
    this.setState({ isNavbarOpen: !this.state.isNavbarOpen })
  }

  render() {
    const { isNavbarOpen } = this.state
    return (
      <div>
        <Main isExtra={!isNavbarOpen} /> { /* routing here */ }
        <SideBar isOpen={isNavbarOpen}/>
        <Chat />
        <Navbar isOpen={isNavbarOpen} toggle={this.toggleNavbar} />
        <Alert />
      </div>
    );
  }
}

export default App;
