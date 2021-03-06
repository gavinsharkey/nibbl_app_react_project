# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all


7.times do
  name = Faker::Name.first_name
  u = User.create(display_name: name, email: Faker::Internet.email(name: name), username: Faker::Internet.username(specifier: name), bio: Faker::Quote.famous_last_words, password: '12345')
  35.times do
    u.posts.create(content: Faker::Quote.famous_last_words)
  end
end