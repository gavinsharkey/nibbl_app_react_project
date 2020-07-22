import React, { Component } from 'react'
import PostsScrollView from './PostsScrollView'
import {fetchFeed, createPost, likePost, unlikePost} from '../actions/postsActions'
import { connect } from 'react-redux'
import Loading from './Loading'
import FeedPostForm from './FeedPostForm'
import UsersToFollowContainer from './UsersToFollowContainer'

class FeedContainer extends Component {
  componentDidMount() {
    this.props.fetchFeed()
  }

  render() {
    const { loadingPosts, postsData, createPost, likePost, unlikePost } = this.props
    return (
      <div className="mx-5 my-2">
        <h1>Feed</h1>
        <div className="row">
          <div className="col-8">
            <FeedPostForm createPost={createPost} />
            { loadingPosts
            ? <Loading />
            : <PostsScrollView likePost={likePost} unlikePost={unlikePost} postsData={postsData} /> }
            
          </div>
          <div className="col-4"> 
            <UsersToFollowContainer />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    postsData: state.postsData,
    loadingPosts: state.postsData.loadingPosts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchFeed: (offset = 0) => dispatch(fetchFeed(offset)),
    createPost: content => dispatch(createPost(content)),
    likePost: postId => dispatch(likePost(postId)),
    unlikePost: likeId => dispatch(unlikePost(likeId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer)
