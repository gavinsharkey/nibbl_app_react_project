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

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end