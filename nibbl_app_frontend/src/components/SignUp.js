import React, { Component } from 'react'
import { fetchWithCredentials } from '../concerns/fetchable'
import { loginUser } from '../actions/currentUserActions'
import { connect } from 'react-redux'

class SignUp extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: []
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.passwordConfirmation
    }
    fetchWithCredentials('http://localhost:3001/api/v1/users', 'POST', {user})
    .then(json => {
      if (json.logged_in) {
        this.props.loginUser(json.user)
        this.props.history.push('/')
      } else {
        this.setState(prevState => {
          return { ...prevState, errors: json.errors }
        })
      }
    })
  }

  render() {
    const { username, email, password, passwordConfirmation} = this.state
    return (
      <div className="registration w-50 p-4 mx-auto my-4">
        <h3>Sign Up</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-6">
              <label htmlFor="username">Username: </label>
              <input onChange={this.handleChange} type="text" name="username" value={username} placeholder="Enter Username" className="form-control p-2" />
            </div>
            <div className="form-group col-6">
              <label htmlFor="email">Email: </label>
              <input onChange={this.handleChange} type="email" name="email" value={email} placeholder="Enter Email" className="form-control p-2" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-6">
              <label htmlFor="password">Password: </label>
              <input onChange={this.handleChange} type="password" name="password" value={password} placeholder="Enter Password" className="form-control p-2" />
            </div>
            <div className="form-group col-6">
              <label htmlFor="passwordConfirmation">Password Confirmation: </label>
              <input onChange={this.handleChange} type="password" name="passwordConfirmation" value={passwordConfirmation} placeholder="Enter Password Confirmation" className="form-control p-2" />
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn form-btn">Sign Up</button>
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

export default connect(null, mapDispatchToProps)(SignUp)
