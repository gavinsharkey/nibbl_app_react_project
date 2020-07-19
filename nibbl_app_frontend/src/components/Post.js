import React from 'react'
import PostButtons from './PostButtons'
import { connect } from 'react-redux'
import { likePost, unlikePost } from '../actions/postsActions'
import PostHeader from './PostHeader'
import { Link } from 'react-router-dom'

function Post(props) {
  const { likePost, unlikePost, isLiked, post: { id, content, time_created_string, user, likes } } = props
  return (
    <div className="post container my-2 p-3 px-4 border">
        <PostHeader user={user} time_created_string={time_created_string} />
        <Link to={`/posts/${id}`}>
          <div className="post-body p-2 rounded">
            <p>{content}</p>
          </div>
        </Link>
        <PostButtons
          currentUserId={props.currentUserId}
          postId={id}
          likes={likes}
          likePost={likePost}
          unlikePost={unlikePost}
          isLiked={isLiked}
        />
    </div>
  )
}


const mapStateToProps = state => {
  return {
    currentUserId: state.user.id
  }
}


export default connect(mapStateToProps, { likePost, unlikePost })(Post)
