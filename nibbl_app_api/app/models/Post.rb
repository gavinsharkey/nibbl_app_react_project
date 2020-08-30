class Post < ApplicationRecord
  belongs_to :user

  has_many :comments

  has_many :likes
  has_many :users_that_liked, through: :likes, source: :user

  validates :content, presence: true, length: { maximum: 30 }

  def self.from_current_user_and_their_followers(current_user)
    joins("LEFT JOIN follows ON posts.user_id = follows.followed_user_id WHERE follows.follower_id = #{current_user.id} OR posts.user_id = #{current_user.id}").order(created_at: :desc)
  end

  def self.by_user(user_id)
    where(user_id: user_id).order(created_at: :desc)
  end

  def self.offset_by(page)
    limit(25).offset(25 * page.to_i)
  end

  def time_created_string
    self.created_at.strftime('%a, %b %e, %l:%M %p')
  end
end
