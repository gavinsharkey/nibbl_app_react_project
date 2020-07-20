import React from 'react'

export default function Comment(props) {
  const { destroyComment, currentUserId, comment: {id, body, user_id, user: {display_name, username}} } = props
  let deleteButton
  if (currentUserId === user_id) {
    deleteButton = (<div className='buttons float-right'>
      <button onClick={() => destroyComment(id)} className="btn btn-sm btn-danger">Delete</button>
    </div>)
  } else {
    deleteButton = null
  }
  return (
    <div className="comment p-2 my-2">
      {deleteButton}
      <div>
        <h5>{display_name} <small>{`@${username}`}</small></h5>
      </div>
      <p>{body}</p>
    </div>
  )
}
