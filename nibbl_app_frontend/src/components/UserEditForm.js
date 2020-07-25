import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateUser } from '../actions/userActions'

class UserEditForm extends Component {
  state = {
    displayName: this.props.user.display_name,
    bio: this.props.user.bio
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.updateUser(this.props.user.id, this.state)
    this.props.setIsEditing(false)
  }

  render() {
    return (
      <div>
        <div className="clearfix">
          <h1 className="float-left">Edit</h1>
          <button onClick={() => this.props.setIsEditing(false)} className="btn btn-danger float-right">Cancel</button>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Display Name: </label>
            <input onChange={this.handleChange} value={this.state.displayName} type="text" name="displayName" className="form-control p-2" />
          </div>
          <div className="form-group">
            <label>Bio: </label>
            <textarea onChange={this.handleChange} value={this.state.bio} name="bio" className="form-control p-2" />
          </div>
          <div className="form-group">
            <input type="submit" value="Save" className="btn btn-secondary" />
          </div>
        </form>
      </div>
    )
  }
}

export default connect(null, {updateUser})(UserEditForm)
