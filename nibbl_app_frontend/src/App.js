import React, { Component } from 'react';
import { connect } from 'react-redux'
import { checkLoggedInStatus } from './actions/currentUserActions'
import Home from './components/Home';
import Dashboard from './components/Dashboard'
import Loading from './components/Loading';

class App extends Component {

  componentDidMount() {
    this.props.checkLoggedInStatus()
  }

  render() {
    const { isLoggedIn, isLoading } = this.props
    const renderedComponent = isLoggedIn ? <Dashboard /> : <Home />
    return (
      <div>
        { isLoading
        ? <Loading />
        : renderedComponent }
        
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    isLoading: state.isLoading,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkLoggedInStatus: () => dispatch(checkLoggedInStatus())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
