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
    console.log(this.props)
    const { postNotFound, loadingLike, loadingPost, likePost, unlikePost, postData } = this.props
    if ( postNotFound ) {
      return <Redirect to='/' />
    }
    return (
      <div className="mx-5 my-2 container">
        <div className="row">
          <div className="col-8">
            { loadingPost
            ? <Loading />
            : <Post
                post={postData.post}
                loadingLike={loadingLike}
                isLiked={postData.liked_by_current_user}
                likePost={likePost}
                unlikePost={unlikePost}
              />
            }
            <CommentsContainer postId={this.props.match.params.id} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    postNotFound: state.postData.postNotFound,
    loadingLike: state.postData.loadingLike,
    loadingPost: state.postData.loadingPost,
    postData: state.postData.post,
  }
}

export default connect(mapStateToProps, { fetchPost, likePost, unlikePost })(PostContainer)
