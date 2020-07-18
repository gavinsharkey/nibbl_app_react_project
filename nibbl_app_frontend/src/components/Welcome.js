import React, { Component } from 'react'
import { Link } from 'react-router-dom' 

export default class Welcome extends Component {
  render() {
    return (
      <div className="d-flex flex-column justify-content-center m-5">
        <h1>Welcome To NibbL</h1>
        <p style={{fontStyle: 'italic'}}>Lets Keep It Short</p>
        <div className="btn-group">
          <Link className="link-button" to="/login">Login</Link>
          <Link className="link-button" to="/signup">Sign Up</Link>
        </div>
      </div>
    )
  }
}
