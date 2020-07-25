import React from 'react'
import { NavLink } from 'react-router-dom'
import SearchContainer from './SearchContainer'
import { connect } from 'react-redux'

function NavBar(props) {
  return (
    <header className="p-2 px-4 mynavbar">
      <div className="clearfix">
        <button onClick={() => props.handleLogout()} className='btn btn-outline-dark'>Logout</button>
        <NavLink exact to="/" className="float-right mx-1 btn btn-outline-dark">Feed</NavLink>
        <NavLink to={`/users/${props.currentUserId}`} className="float-right mx-1 btn btn-outline-dark">Profile</NavLink>
        <SearchContainer />
      </div>
    </header>
  )
}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUser.id
  }
}

export default connect(mapStateToProps)(NavBar)
