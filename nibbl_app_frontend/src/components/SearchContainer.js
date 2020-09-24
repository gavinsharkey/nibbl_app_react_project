import React, { Component } from 'react'
import { connect } from 'react-redux'
import { debounce } from 'debounce'
import { search, clearSearch } from '../actions/searchActions'
import SearchInput from './SearchInput'
import SearchItems from './SearchItems'

class SearchContainer extends Component {
  constructor() {
    super()

    this.state = {
      value: ''
    }
  }

  componentDidMount() {
    this.handleSearch = debounce(this.handleSearch, 500)
  }

  handleChange = value => {
    if (value.length > 0) {
      this.handleSearch()
    } else {
      this.props.clearSearch()
    }
    
    this.setState({
      value
    })
  }

  handleSearch = () => {
    if (this.state.value.length > 0) {
      this.props.search(this.state.value)
    }
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
