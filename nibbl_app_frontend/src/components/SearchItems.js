import React from 'react'
import SearchItem from './SearchItem'

export default function SearchItems(props) {
  const { users } = props.searchData
  return (
    <div style={{zIndex: 1}} className="position-absolute">
      <ul className='list-group'>
        {users.map(user => (
          <SearchItem clearSearchBar={props.clearSearchBar} user={user} />
        ))}
      </ul>
    </div>
  )
}
