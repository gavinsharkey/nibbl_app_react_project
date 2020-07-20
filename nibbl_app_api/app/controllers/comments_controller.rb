class CommentsController < ApplicationController
  def index
    @comments = Comment.where(post_id: params[:post_id]).order(created_at: :desc)
    render json: @comments, include: { user: { except: [:password_digest] } }
  end

  def create
    @comment = current_user.comments.build(comment_params)
    if @comment.save
      render json: {
        status: 200,
        comment: @comment
      }, include: { user: { except: [:password_digest] } }
    else
      render json: {
        status: 500,
        errors: @comment.errors.full_messages
      }
    end
  end

  def destroy
    @comment = Comment.find_by(id: params[:id])
    @comment.destroy
    render json: @comment
  end

  private

  def comment_params
    params.require(:comment).permit(:post_id, :body)
  end
end