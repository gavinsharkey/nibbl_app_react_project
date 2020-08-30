import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import { likePost, unlikePost } from '../actions/postsActions'

class PostsScrollView extends Component {

  state = {
    prevY: 0
  }

  componentDidMount() {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5
    };

    this.observer = new IntersectionObserver(
      this.handleScroll,
      options
    );

    this.observer.observe(this.loadingRef);
  }

  handleScroll = (entities) => {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      this.props.handleLoadMore()
    }

    this.setState({ prevY: y })
  }

  loadMoreArea = () => {
    const { loadingMorePosts, noMorePosts } = this.props.postsData
    if ( noMorePosts ) {
      return <h3 className="text-center">No More Posts</h3>
    } else if (loadingMorePosts) {
      return <h3>Loading...</h3>
    }
  }
  
  render() {
    const { likePost, unlikePost, posts, loadingLike } = this.props
    return (
      <div>
        <div className="d-flex flex-column rounded posts">
          { posts.map(post => (
            <Post likePost={likePost} unlikePost={unlikePost} loadingLike={loadingLike} key={post.id} post={post} />
          )) }
        </div>
        <div className='mt-2 p-1' ref={loadingRef => this.loadingRef = loadingRef}>
          {this.loadMoreArea()}
        </div>
      </div>
    )
  }
}

export default connect(null, { likePost, unlikePost })(PostsScrollView)

