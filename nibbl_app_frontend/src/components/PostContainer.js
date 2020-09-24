import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchPost, likePost, unlikePost } from '../actions/postActions'
import Post from './Post'
import Loading from './Loading'
import CommentsContainer from './CommentsContainer'

class PostContainer extends Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id)
  }

  render() {
    const { postNotFound, loadingLike, loadingPost, likePost, unlikePost, post } = this.props
    if ( postNotFound ) {
      return <Redirect to='/' />
    }
    return (
      <div className="mx-2">
        { loadingPost
        ? <Loading />
        : <Post
            post={post}
            loadingLike={loadingLike}
            likePost={likePost}
            unlikePost={unlikePost}
          />
        }
        <CommentsContainer postId={this.props.match.params.id} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    postNotFound: state.postData.postNotFound,
    loadingLike: state.postData.loadingLike,
    loadingPost: state.postData.loadingPost,
    post: state.postData.post,
  }
}

export default connect(mapStateToProps, { fetchPost, likePost, unlikePost })(PostContainer)
