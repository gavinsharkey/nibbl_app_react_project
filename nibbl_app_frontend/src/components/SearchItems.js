import React from 'react'
import SearchItem from './SearchItem'

export default function SearchItems(props) {
  const { users, isSearching } = props.searchData
  return (
    <div className="position-absolute">
      <ul className='list-group'>
        {users.map(user => (
          <SearchItem clearSearchBar={props.clearSearchBar} user={user} />
        ))}
      </ul>
    </div>
  )
}
