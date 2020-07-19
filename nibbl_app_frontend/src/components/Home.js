import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Welcome from './Welcome'
import Login from './Login'
import SignUp from './SignUp'

export default class Home extends Component {
  render() {
    return (
      <div className="jumbotron jumbotron-fluid my-5">
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/:else" render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    )
  }
}
