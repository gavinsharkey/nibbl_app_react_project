import React from 'react'
import { Link } from 'react-router-dom'

export default function UserToFollow(props) {
  const {user, currentUserFollows, followUser, unfollowUser} = props

  const handleUnfollow = () => {
    const follow = currentUserFollows.find(follow => follow.followed_user_id === user.id)
    unfollowUser(follow.id)
  }

  const followButton = () => {
    if (currentUserFollows.find(follow => follow.followed_user_id === user.id)) {
      return <button onClick={handleUnfollow} className="btn btn-sm btn-outline-secondary d-inline mx-2">Unfollow</button>
    } else {
      return <button onClick={() => followUser(user.id)} className="btn btn-sm btn-outline-secondary d-inline mx-2">Follow</button>
    }
  }

  return (
    <li className="list-group-item">
      <Link to={`/users/${user.id}`}>
        <span><strong>{user.display_name}</strong> <small>@{user.username}</small></span>
      </Link>
       {followButton()}
    </li>
  )
}
