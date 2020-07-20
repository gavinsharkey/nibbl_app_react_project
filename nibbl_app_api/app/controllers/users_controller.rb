class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login!
      render json: {
        status: 200,
        logged_in: true,
        user: @user
      }
    else
      render json: {
        status: 500,
        logged_in: false,
        errors: @user.errors.full_messages
      }
    end
  end

  def show
    @user = User.find_by(id: params[:id])
    if @user
      render json: {
        followed_by_current_user: @user.received_follows.exists?(follower: current_user),
        user: @user
      }, except: [:password_digest], methods: [:followers_count, :followings_count]
    else
      render json: {
        status: 404,
        error: 'User Not Found'
      }
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end