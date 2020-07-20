import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchComments, createComment, destroyComment } from '../actions/commentsActions'
import CommentsScrollView from './CommentsScrollView'
import Loading from './Loading'
import CommentForm from './CommentForm'

class CommentsContainer extends Component {

  componentDidMount() {
    this.props.fetchComments(this.props.postId)
  }

  render() {
    const { currentUserId, postId, createComment, destroyComment, loadingComments, comments } = this.props
    if (loadingComments) {
      return <Loading />
    }
    return (
      <div>
        <CommentForm postId={postId} createComment={createComment} />
        <CommentsScrollView destroyComment={destroyComment} currentUserId={currentUserId} comments={comments} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUser.id,
    loadingComments: state.commentsData.loadingComments,
    comments: state.commentsData.comments
  }
}

export default connect(mapStateToProps, { fetchComments, createComment, destroyComment })(CommentsContainer)
