import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './Home'
import Login from './Login'
import Register from './Register'
import NewsFeed from './NewsFeed'
import Profile from './Profile'
import Members from './Members'
import Test from './Test'
import TestStatus from './TestStatus'
import TestDetail from './TestDetail'
import Messages from './Messages'
import AddQuestion from './AddQuestion'
import CreateTest from './CreateTest'
import ErrorPage from './ErrorPage'

import T from './cells/T'

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
            <Route exact path='/add-question' component={AddQuestion}/>
            <Route exact path='/create-test' component={CreateTest}/>

            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>

            <Route exact path='/test/:id' component={Test}/>
            <Route exact path='/test-detail/:id' component={TestDetail}/>
            <Route exact path='/test-status/:id' component={TestStatus}/>
            <Route exact path='/t' component={T}/>

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
