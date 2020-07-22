import React from 'react'
import { Link } from 'react-router-dom'

export default function SearchItem(props) {
  const { user } = props
  return (
    <li className="list-group-item">
      <Link onClick={() => props.clearSearchBar()} to={`/users/${user.id}`}>
        <span><strong>{user.display_name}</strong> <small>@{user.username}</small></span>
      </Link>
    </li>
  )
}
