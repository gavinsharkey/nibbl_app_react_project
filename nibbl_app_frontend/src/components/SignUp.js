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
    displayName: '',
    bio: '',
    errors: [],
    usernameTaken: false
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.username !== this.state.username) {
      fetchWithCredentials(`http://localhost:3001/api/v1/users/exists?username=${this.state.username}`)
      .then(json => {
        this.setState({
          usernameTaken: json.username_taken
        })
      })
    }
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
      password_confirmation: this.state.passwordConfirmation,
      display_name: this.state.displayName,
      bio: this.state.bio
    }

    fetchWithCredentials('http://localhost:3001/api/v1/users', 'POST', {user})
    .then(json => {
      if (json.logged_in) {
        this.props.loginUser(json.user)
        this.props.history.push('/')
      } else {
        this.setState(prevState => {
          return { ...prevState, errors: json.errors, onSecondPage: false }
        })
      }
    })
  }

  render() {
    const { username, email, displayName, password, passwordConfirmation, bio, usernameTaken} = this.state
    return (
      <div>
        <form ref={this.form} className="d-flex justify-content-center flex-row" onSubmit={this.handleSubmit}>
          <div className="registration w-50 p-4 mx-2 my-4">
            <h3>Sign Up</h3>
            <div className="form-row">
              <div className="form-group col-6">
                <label htmlFor="username">Username: </label>
                <div className="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">@</span>
                  </div>
                  <input onChange={this.handleChange} type="text" name="username" value={username} placeholder="Enter Username" className={`form-control p-2 ${usernameTaken ? 'is-invalid' : null}`} required/>
                </div>
                {usernameTaken ? <small>Username Taken</small> : null}
              </div>
              <div className="form-group col-6">
                <label htmlFor="email">Email: </label>
                <input onChange={this.handleChange} type="email" name="email" value={email} placeholder="Enter Email" className="form-control p-2" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-6">
                <label htmlFor="password">Password: </label>
                <input onChange={this.handleChange} type="password" name="password" value={password} placeholder="Enter Password" className="form-control p-2" required/>
              </div>
              <div className="form-group col-6">
                <label htmlFor="passwordConfirmation">Password Confirmation: </label>
                <input onChange={this.handleChange} type="password" name="passwordConfirmation" value={passwordConfirmation} placeholder="Enter Password Confirmation" className="form-control p-2" required />
              </div>
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-secondary" value="Sign Up" />
            </div>
          </div>
          <div className="registration w-25 p-4 mx-2 my-4">
            <h3>Personal Info</h3>
            <div className="form-group">
              <label>Display Name: </label>
              <input onChange={this.handleChange} type="text" name="displayName" value={displayName} className="form-control p-2" />
              <small>This is separate from your username and can be changed later.</small>
            </div>
            <div className="form-group">
              <label>Bio: </label>
              <textarea onChange={this.handleChange} name="bio" value={bio} className="form-control p-2" />
            </div>
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
