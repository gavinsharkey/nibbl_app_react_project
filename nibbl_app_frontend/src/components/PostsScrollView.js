import React, { Component } from 'react'
import Post from './Post'

class PostsScrollView extends Component {
  render() {
    const { likePost, unlikePost, postsData: {posts, loadingLike} } = this.props
    return (
      <div className="d-flex flex-column rounded posts">
        { posts.map(postData => (
          <Post likePost={likePost} unlikePost={unlikePost} loadingLike={loadingLike} key={postData.post.id} post={postData.post} isLiked={postData.liked_by_current_user} />
        )) }
      </div>
    )
  }
}

export default PostsScrollView

