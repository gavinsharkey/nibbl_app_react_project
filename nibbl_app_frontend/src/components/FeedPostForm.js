import React, { Component } from 'react'

export default class FeedPostForm extends Component {
  state = {
    content: '',
    invalidForm: false
  }

  handleChange = e => {
    this.setState({
      content: e.target.value,
      invalidForm: false
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    if (e.target.reportValidity()) {
      this.props.createPost(this.state.content)
      this.setState({
        content: ''
      })
    } else {
      this.setState({
        invalidForm: true
      })
    }
  }

  render() {
    return (
      <div className="post-form p-3 my-2 border">
        <form className={`needs-validation ${this.state.invalidForm ? 'was-validated' : null}`} onSubmit={this.handleSubmit} noValidate >
          <div className="form-group">
            <label>Content: </label>
            <textarea required maxLength={30} value={this.state.content} onChange={this.handleChange} className="form-control p-3" placeholder="Make a post!" />
            <small>Characters Left: {30 - this.state.content.length}</small>
            <div className="invalid-feedback"> 
              Invalid Post
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Post" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
