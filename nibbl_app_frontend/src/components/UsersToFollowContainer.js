import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUsersToFollow, followUser, unfollowUser } from '../actions/usersToFollowActions'
import UserToFollow from './UserToFollow'

class UsersToFollowContainer extends Component {
  componentDidMount() {
    this.props.fetchUsersToFollow()
  }

  render() {
    const { usersToFollowData, currentUserFollows, followUser, unfollowUser } = this.props
    return (
      <div className="p-3 users-to-follow">
        <h4>Users To Follow: </h4>
        <ul className="list-group">
          {usersToFollowData.users.map(user => (
            <UserToFollow
              key={user.id}
              followUser={followUser}
              unfollowUser={unfollowUser}
              currentUserFollows={currentUserFollows}
              user={user}
            />
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUserFollows: state.currentUser.given_follows,
    usersToFollowData: state.usersToFollowData
  }
}

export default connect(mapStateToProps, {fetchUsersToFollow, followUser, unfollowUser})(UsersToFollowContainer)
