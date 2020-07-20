import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPostsByUser, likePost, unlikePost } from '../actions/postsActions'
import PostsScrollView from './PostsScrollView'
import Loading from './Loading'

class UserContainer extends Component {
  componentDidMount() {
    this.props.fetchPostsByUser(this.props.match.params.id)
  }

  render() {
    const { postsData, likePost, unlikePost } = this.props
    return (
      <div className="mx-5 my-4 container">
        <div className="user-header clearfix">
          <div className="user-bio float-left">
            <h1>Gavin Sharkey <small>@gavin</small></h1>
            <p>Software Engineer | Dev | Florida</p>
            <span className='d-inline-block mr-2'>Followers: 10</span>
            <span className='d-inline-block mr-2'>Following: 16</span>
          </div>
          <div className="float-left my-2 mx-3">
            <button className="btn btn-secondary">Follow</button>
          </div>
        </div>
        <div className="user-posts my-2 row">
          <div className="col-8">
            <h3>Posts: </h3>
            { postsData.loadingPosts
            ? <Loading />
            : <PostsScrollView likePost={likePost} unlikePost={unlikePost} postsData={postsData} /> }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    postsData: state.postsData
  }
}

export default connect(mapStateToProps, { fetchPostsByUser, likePost, unlikePost })(UserContainer)
