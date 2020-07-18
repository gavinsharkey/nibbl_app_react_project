import React, { Component } from 'react'

export default class NavBar extends Component {
  render() {
    return (
      <header className="p-2 navbar">
        <div className="buttons clearfix mx-2">
          <button onClick={() => this.props.handleLogout()} className='float-right btn btn-outline-dark'>Logout</button>
        </div>
      </header>
    )
  }
}
