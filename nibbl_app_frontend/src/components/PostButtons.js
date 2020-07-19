import React from 'react'

export default function PostButtons(props) {
  const handleUnlike = () => {
    const like = props.likes.find(like => like.user_id === props.currentUserId)
    props.unlikePost(like.id)
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
        <button onClick={() => props.likePost(props.postId)} className="btn post-button unliked">Like {props.likes.length}</button>
      </div>
    )
  }
}
