import React from 'react'

export default function PostButtons(props) {
  const handleLike = () => {
    if (!props.loadingLike) {
      props.likePost(props.postId)
    }
  }

  const handleUnlike = () => {
    const like = props.likes.find(like => like.user_id === props.currentUserId)
    if (!props.loadingLike) {
      props.unlikePost(like.id)
    }
  }

  if (props.isLiked) {
    return (
      <div className='post-buttons p-2'>
        <button onClick={handleUnlike} className="btn post-button liked">Unlike {props.likes.length}</button>
      </div>
    )
  } else {
    return (
      <div className='post-buttons p-2'>
        <button onClick={handleLike} className="btn post-button unliked">Like {props.likes.length}</button>
      </div>
    )
  }
}
