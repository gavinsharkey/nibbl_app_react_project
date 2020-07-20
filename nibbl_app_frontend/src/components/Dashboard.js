import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/currentUserActions'
import { fetchWithCredentials } from '../concerns/fetchable'
import { Switch, Route, Redirect } from 'react-router-dom'
import NavBar from './NavBar'
import FeedContainer from './FeedContainer'
import PostContainer from './PostContainer'
import UserContainer from './UserContainer'

class Dashboard extends Component {
  handleLogout = () => {
    fetchWithCredentials('http://localhost:3001/api/v1/logout', 'DELETE')
    .then(json => {
      if (json.logged_out) {
        this.props.logoutUser()
      }
    })
  }

  render() {
    return (
      <div>
        <NavBar handleLogout={this.handleLogout} />
        <div className='mx-5 p-2 h-100 dashboard'>
          <Switch>
            <Route exact path="/" component={FeedContainer} />
            <Route path="/posts/:id" component={PostContainer} />
            <Route path='/users/:id' component={UserContainer} />
            <Route path="/:else" render={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </div>
    )
  }
}



export default connect(null, { logoutUser })(Dashboard)
