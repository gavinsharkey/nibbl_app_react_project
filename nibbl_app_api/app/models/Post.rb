class Post < ApplicationRecord
  belongs_to :user

  has_many :likes
  has_many :users_that_liked, through: :likes, source: :user

  validates :content, presence: true, length: { maximum: 30 }

  def self.from_current_users_followers(current_user, page=0)
    joins("INNER JOIN follows ON posts.user_id = follows.followed_user_id WHERE follows.follower_id = #{current_user.id}").order(created_at: :desc).limit(50).offset(page * 50)
  end

  def time_created_string
    self.created_at.strftime('%a, %b %e, %l:%M %p')
  end
end
