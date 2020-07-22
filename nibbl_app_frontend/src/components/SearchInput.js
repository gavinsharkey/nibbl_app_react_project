import React, { Component } from 'react'

export default class SearchInput extends Component {
  render() {
    return (
      <div>
        <input onChange={e => this.props.handleChange(e.target.value)} value={this.props.value} type="text" className="form-control p-2" placeholder="Search" />
      </div>
    )
  }
}
