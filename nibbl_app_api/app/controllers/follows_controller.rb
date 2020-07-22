class FollowsController < ApplicationController
  def create
    @follow = Follow.new(follower: current_user, followed_user_id: params[:follow][:followed_user_id])
    if @follow.save
      render json: @follow
    else
      render json: { errors: @follow.errors.full_messages }
    end
  end

  def destroy
    @follow = Follow.find_by(id: params[:id])
    @follow.destroy
    render json: @follow
  end
end