import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './Home'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import NewsFeed from './NewsFeed'
import ErrorPage from './ErrorPage'

import './Main.css'

class Main extends Component {

  render() {
    const { isExtra } = this.props

    return (
      <div id='main' className={isExtra? 'extra' : ''}>
        <div className="main-content">
          <Switch>

            <Route exact path='/' render={() => <Redirect to='/home' />} />
            <Route exact path='/home' component={Home}/>
            <Route exact path='/profile' component={Profile}/>
            <Route exact path='/news-feed' component={NewsFeed}/>

            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>
            <Route component={ErrorPage}/>
          </Switch>
        </div>

        <div className="main-ad">
          <div className="banner">
            <div>BANNER ADs</div>
          </div>
          <div className="banner">
            <div>BANNER ADs</div>
          </div>
          <div className="banner">
            <div>BANNER ADs</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Main
