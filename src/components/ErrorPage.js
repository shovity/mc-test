import React, { Component } from 'react';

import './ErrorPage.css';

class ErrorPage extends Component {

  render() {
    console.log('render')
    return (
      <div id='error'>404 Notfound</div>
    );
  }

}

export default ErrorPage;
