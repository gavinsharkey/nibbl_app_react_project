class UserSerializer < ActiveModel::Serializer
  has_many :likes
  has_many :given_follows
  has_many :received_follows
end