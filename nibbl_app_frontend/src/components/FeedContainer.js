import React, { Component } from 'react'
import PostsScrollView from './PostsScrollView'
import {fetchFeed} from '../actions/postsActions'
import { connect } from 'react-redux'
import Loading from './Loading'

class FeedContainer extends Component {
  componentDidMount() {
    this.props.fetchFeed()
  }

  render() {
    const { isLoading, postsData } = this.props
    return (
      <div className="mx-5 my-2 container">
        <h1>Feed</h1>
        <div className="row">
          <div className="col-8">
            { isLoading
            ? <Loading />
            : <PostsScrollView postsData={postsData} /> }
            
          </div>
          <div className="col-4"> 
            Follow
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    postsData: state.postsData,
    isLoading: state.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchFeed: (offset = 0) => dispatch(fetchFeed(offset))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer)
