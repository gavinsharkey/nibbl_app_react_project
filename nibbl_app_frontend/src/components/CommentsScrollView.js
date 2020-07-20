import React from 'react'
import Comment from './Comment'

export default function CommentsScrollView(props) {
  return (
    <div className="comments d-flex flex-column">
      {props.comments.map(comment => (
        <Comment destroyComment={props.destroyComment} currentUserId={props.currentUserId} comment={comment} />
      ))}
    </div>
  )
}
