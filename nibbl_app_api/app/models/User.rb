class User < ApplicationRecord
  has_secure_password

  has_many :posts, dependent: :destroy

  has_many :likes
  has_many :liked_posts, through: :likes, source: :post

  has_many :comments

  has_many :received_follows, foreign_key: :followed_user_id, class_name: 'Follow', dependent: :destroy
  has_many :followers, through: :received_follows, source: :follower

  has_many :given_follows, foreign_key: :follower_id, class_name: 'Follow', dependent: :destroy
  has_many :followings, through: :given_follows, source: :followed_user

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP, message: 'must be valid'}
  
  def followers_count
    self.received_follows.count
  end

  def followings_count
    self.given_follows.count
  end
end
