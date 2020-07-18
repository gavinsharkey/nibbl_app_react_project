import React, { Component } from 'react'
import Post from './Post'

export default class PostsScrollView extends Component {
  render() {
    const { posts, current_page } = this.props.postsData
    return (
      <div className="d-flex flex-column rounded posts">
        { posts.map(post => (
          <Post key={post.id} post={post} />
        )) }
      </div>
    )
  }
}

