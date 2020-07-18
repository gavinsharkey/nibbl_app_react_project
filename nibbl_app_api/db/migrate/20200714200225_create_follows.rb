class CreateFollows < ActiveRecord::Migration[6.0]
  def change
    create_table :follows do |t|
      t.bigint :follower_id
      t.bigint :followed_user_id

      t.timestamps
    end
  end
end
