import React, { useState } from 'react'
import UserEditForm from './UserEditForm'

export default function UserHeader(props) {
  const [ isEditing, setIsEditing ] = useState(false)

  const { handleFollow, handleUnfollow, currentUserFollows, currentUserId, user } = props

  const isFollowed = !!currentUserFollows.find(follow => follow.followed_user_id === user.id)
  const isCurrentUser = (currentUserId === user.id)

  const interactionButton = () => {
    if (isCurrentUser) {
      return <button onClick={() => setIsEditing(true)} className="btn btn-secondary">Edit Profile</button>
    } else {
      if (isFollowed) {
        return <button onClick={handleUnfollow} className="btn btn-secondary">Unfollow</button>
      } else {
        return <button onClick={handleFollow} className="btn btn-secondary">Follow</button>
      }
    }
  }

  const renderHeaderOrForm = () => {
    if (isEditing) {
      return <UserEditForm setIsEditing={setIsEditing} user={user} />
    } else {
      return (
        <>
          <div className="user-bio float-left">
            <h1>{user.display_name} <small>@{user.username}</small></h1>
            <p>{user.bio}</p>
            <span className='d-inline-block mr-2'>Followers: {user.followers_count}</span>
            <span className='d-inline-block mr-2'>Following: {user.followings_count}</span>
          </div>
          <div className="float-left my-2 mx-3">
            {interactionButton()}
          </div>
        </>
      )
    }
  }

  return (
    <div className="user-header clearfix">
      {renderHeaderOrForm()}
    </div>
  )
}
