import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './Home'
import Login from './Login'
import Register from './Register'
import NewsFeed from './NewsFeed'
import Profile from './Profile'
import Members from './Members'
import Test from './Test'
import Messages from './Messages'
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
            <Route exact path='/news-feed' component={NewsFeed}/>
            <Route exact path='/profile/:name' component={Profile}/>
            <Route exact path='/members' component={Members}/>
            <Route exact path='/messages' component={Messages}/>

            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>

            <Route exact path='/test/:id' component={Test}/>

            <Route component={ErrorPage}/>
          </Switch>
        </div>

        <div className="main-ad">
          <div className="banner">
            <div>BANNER ADs</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Main
