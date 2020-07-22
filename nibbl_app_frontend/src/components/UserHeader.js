import React from 'react'

export default function UserHeader(props) {
  const { loadingFollow, currentUserFollows, user, isFollowed } = props

  const handleFollow = () => {
    if (!loadingFollow) {
      props.followUser(user.id)
    }
  }

  const handleUnfollow = () => {
    const follow = currentUserFollows.find(follow => follow.followed_user_id === user.id)

    if (!loadingFollow) {
      props.unfollowUser(follow.id)
    }
  }

  let followButton
  if (isFollowed) {
    followButton = <button onClick={handleUnfollow} className="btn btn-secondary">Unfollow</button>
  } else {
    followButton = <button onClick={handleFollow} className="btn btn-secondary">Follow</button>
  }
  return (
    <div className="user-header clearfix">
      <div className="user-bio float-left">
        <h1>{user.display_name} <small>@{user.username}</small></h1>
        <p>{user.bio}</p>
        <span className='d-inline-block mr-2'>Followers: {user.followers_count}</span>
        <span className='d-inline-block mr-2'>Following: {user.followings_count}</span>
      </div>
      <div className="float-left my-2 mx-3">
        {followButton}
      </div>
    </div>
  )
}
