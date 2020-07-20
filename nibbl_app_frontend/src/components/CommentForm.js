import React, { Component } from 'react'

export default class CommentForm extends Component {
  state = {
    body: ''
  }

  handleChange = e => {
    this.setState({
      body: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.createComment(this.props.postId, this.state.body)
  }

  render() {
    return (
      <div className="post-form rounded p-3 my-2 border">
        <h3>Comment</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" onChange={this.handleChange} className="form-control p-1" />
          </div>
          <div className="form-group">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
