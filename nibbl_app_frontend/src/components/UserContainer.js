import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPostsByUser, fetchMorePostsByUser } from '../actions/postsActions'
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

  handleFollow = () => {
    if (!this.props.userData.loadingFollow) {
      this.props.followUser(this.props.userData.user.id)
    }
  }

  handleUnfollow = () => {
    const follow = this.props.currentUserFollows.find(follow => follow.followed_user_id === this.props.userData.user.id)

    if (!this.props.userData.loadingFollow) {
      this.props.unfollowUser(follow.id)
    }
  }

  handleLoadMore = () => {
    const { loadingMorePosts, noMorePosts, currentPage } = this.props.postsData
    if (!loadingMorePosts && !noMorePosts) {
      this.props.fetchMorePostsByUser(this.props.match.params.id, currentPage + 1)
    }
  }

  render() {
    const { currentUserFollows, currentUserId, postsData, userData: { loadingUser, userNotFound, user } } = this.props
    if (userNotFound) {
      return <Redirect to="/" />
    }

    return (
      <div className="mx-5 my-4">
        <div className="my-2 row">
          <div className="col-12 col-lg-8">
          { loadingUser
          ? <Loading/>
          : <UserHeader
              handleFollow={this.handleFollow}
              handleUnfollow={this.handleUnfollow}
              currentUserFollows={currentUserFollows}
              currentUserId={currentUserId}
              user={user}
            />}
            <h3>Posts: </h3>
            { postsData.loadingPosts
            ? <Loading />
            : <PostsScrollView handleLoadMore={this.handleLoadMore} postsData={postsData} posts={postsData.posts} /> }
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
    currentUserFollows: state.currentUser.given_follows,
    currentUserId: state.currentUser.id
  }
}

export default connect(mapStateToProps, { fetchPostsByUser, fetchMorePostsByUser, fetchUser, followUser, unfollowUser })(UserContainer)
