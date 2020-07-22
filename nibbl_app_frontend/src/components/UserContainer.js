import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPostsByUser, likePost, unlikePost } from '../actions/postsActions'
import { fetchUser, followUser, unfollowUser } from '../actions/userActions'
import PostsScrollView from './PostsScrollView'
import Loading from './Loading'
import UserHeader from './UserHeader'
import { Redirect } from 'react-router-dom'

class UserContainer extends Component {
  componentDidMount() {
    this.props.fetchPostsByUser(this.props.match.params.id)
    this.props.fetchUser(this.props.match.params.id)
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.fetchPostsByUser(this.props.match.params.id)
      this.props.fetchUser(this.props.match.params.id)
    }
  }

  render() {
    const { match: { params: {id} }, followUser, unfollowUser, currentUserFollows, postsData, likePost, unlikePost, userData: { loadingUser, loadingFollow, userNotFound, user } } = this.props
    if (userNotFound) {
      return <Redirect to="/" />
    }
    const isFollowed = !!currentUserFollows.find(follow => follow.followed_user_id == id)

    return (
      <div className="mx-5 my-4 container">
        { loadingUser
        ? <Loading/>
        : <UserHeader followUser={followUser} unfollowUser={unfollowUser} currentUserFollows={currentUserFollows} loadingFollow={loadingFollow} isFollowed={isFollowed} user={user} />}
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
    postsData: state.postsData,
    userData: state.userData,
    currentUserFollows: state.currentUser.given_follows
  }
}

export default connect(mapStateToProps, { fetchPostsByUser, fetchUser, followUser, unfollowUser, likePost, unlikePost })(UserContainer)
