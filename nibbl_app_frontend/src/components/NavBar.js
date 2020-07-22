import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import SearchContainer from './SearchContainer'

export default class NavBar extends Component {
  render() {
    return (
      <header className="p-2 mynavbar">
        <div className="clearfix">
          <button onClick={() => this.props.handleLogout()} className='btn btn-outline-dark'>Logout</button>
          <NavLink to="/" className="float-right btn btn-outline-dark">Feed</NavLink>
          <SearchContainer />
        </div>
      </header>
    )
  }
}
