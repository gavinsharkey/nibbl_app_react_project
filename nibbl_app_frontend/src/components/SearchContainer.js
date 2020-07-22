import React, { Component } from 'react'
import { connect } from 'react-redux'
import { search, clearSearch } from '../actions/searchActions'
import SearchInput from './SearchInput'
import SearchItems from './SearchItems'

class SearchContainer extends Component {
  state = {
    value: ''
  }

  handleChange = value => {
    if (value) {
      this.props.search(value)
    } else {
      this.props.clearSearch()
    }
    
    this.setState({
      value
    })
  }

  clearSearchBar = () => {
    this.setState({
      value: ''
    })
    this.props.clearSearch()
  }

  render() {
    const { searchData } = this.props
    return (
      <div className="position-relative float-right mx-2">
        <SearchInput value={this.state.value} handleChange={this.handleChange} />
        <SearchItems clearSearchBar={this.clearSearchBar} searchData={searchData} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    searchData: state.searchData
  }
}

export default connect(mapStateToProps, { search, clearSearch })(SearchContainer)
