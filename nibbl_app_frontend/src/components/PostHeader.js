import React from 'react'
import { Link } from 'react-router-dom'

export default function PostHeader(props) {
  const { time_created_string, user: { id, display_name, username } } = props
  return (
    <div className="clearfix post-header h-25">
      <div className="float-left mx-2">
        <Link to={`/users/${id}`}>
          <h5>
            {display_name}
            <small>{` @${username}`}</small>
            <br />
            <small>{time_created_string}</small>
          </h5>
        </Link>
      </div>
    </div>
  )
}
