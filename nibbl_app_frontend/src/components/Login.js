import React, { Component } from 'react'
import { fetchWithCredentials } from '../concerns/fetchable'
import { loginUser } from '../actions/currentUserActions'
import { connect } from 'react-redux'

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    fetchWithCredentials('http://localhost:3001/api/v1/login', 'POST', {
      email: this.state.email,
      password: this.state.password
    })
    .then(json => {
      if (json.logged_in) {
        this.props.loginUser(json.user)
        this.props.history.push('/')
      } else {
        this.setState(prevState => {
          return { ...prevState, error: json.error }
        })
      }
    })
  }

  render() {
    const { email, password, error} = this.state
    return (
      <div className="registration w-25 p-4 mx-auto my-4">
        <h3>Login</h3>
        { error ? <p className="error">{error}</p> : null }
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input onChange={this.handleChange} type="email" name="email" value={email} placeholder="Enter Email" className="form-control p-2" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input onChange={this.handleChange} type="password" name="password" value={password} placeholder="Enter Password" className="form-control p-2" />
          </div>
          <div className="form-group">
            <button type="submit" className="btn form-btn">Login</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => dispatch(loginUser(user))
  }
}

export default connect(null, mapDispatchToProps)(Login)
