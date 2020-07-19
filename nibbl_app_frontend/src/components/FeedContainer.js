import React, { Component } from 'react'
import PostsScrollView from './PostsScrollView'
import {fetchFeed, createPost} from '../actions/postsActions'
import { connect } from 'react-redux'
import Loading from './Loading'
import FeedPostForm from './FeedPostForm'

class FeedContainer extends Component {
  componentDidMount() {
    this.props.fetchFeed()
  }

  render() {
    const { loadingPosts, postsData, createPost } = this.props
    return (
      <div className="mx-5 my-2 container">
        <h1>Feed</h1>
        <div className="row">
          <div className="col-8">
            <FeedPostForm createPost={createPost} />
            { loadingPosts
            ? <Loading />
            : <PostsScrollView postsData={postsData} /> }
            
          </div>
          <div className="col-4"> 
            Follow
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
    createPost: content => dispatch(createPost(content))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer)
