class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  helper_method :encode_token, :logged_in?, :session_user

  private

  def logged_in?
    !!session_user
  end

  def encode_token(payload)
    JWT.encode(payload, 'somethingsomething')
  end

  def session_user
    if !decoded_token.empty?
      user_id = decoded_token[0]['user_id']
      @current_user ||= User.find_by(id: user_id)
    else
      nil
    end
  end

  def decoded_token
    if auth_header
      token = auth_header.split(' ')[1]
      begin
        JWT.decode(token, 'somethingsomething', true, algorithm: 'HS256')
      rescue JWT::DecodeError
        []
      end
    else

    end
  end

  def auth_header
    request.headers['Authorization']
  end
end
