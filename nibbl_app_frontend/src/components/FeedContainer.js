import React, { Component } from 'react'
import PostsScrollView from './PostsScrollView'
import { fetchFeed, fetchMoreFeed, createPost, likePost, unlikePost } from '../actions/postsActions'
import { connect } from 'react-redux'
import Loading from './Loading'
import FeedPostForm from './FeedPostForm'
import UsersToFollowContainer from './UsersToFollowContainer'

class FeedContainer extends Component {
  componentDidMount() {
    this.props.fetchFeed()
  }

  handleLoadMore = () => {
    const { loadingMorePosts, noMorePosts, currentPage } = this.props.postsData
    if (!loadingMorePosts && !noMorePosts) {
      this.props.fetchMoreFeed(currentPage + 1)
    }
  }

  render() {
    const { loadingPosts, postsData, createPost, likePost, unlikePost } = this.props
    return (
      <div className="mx-5 my-2">
        <h1>Feed</h1>
        <div className="row">
          <div className="col-12 col-lg-8">
            <FeedPostForm createPost={createPost} />
            { loadingPosts
            ? <Loading />
            : <PostsScrollView handleLoadMore={this.handleLoadMore} likePost={likePost} unlikePost={unlikePost} postsData={postsData} /> }
            
          </div>
          <div className="d-none d-lg-block col-lg-4"> 
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

export default connect(mapStateToProps, { fetchFeed, fetchMoreFeed, createPost, likePost, unlikePost })(FeedContainer)
