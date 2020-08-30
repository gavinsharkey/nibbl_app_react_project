class LikesController < ApplicationController
  def create
    @like = Like.new(user: session_user, post_id: params[:like][:post_id])
    if @like.save
      render json: @like
    else
      render json: { errors: @like.errors.full_messages }
    end
  end

  def destroy
    @like = Like.find_by(id: params[:id])
    @like.destroy
    render json: @like
  end

  private
end