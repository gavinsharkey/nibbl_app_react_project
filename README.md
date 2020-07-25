# Nibbl App / React-Redux Project

This is Nibbl, my React project! Basically, this is a simple social media with one key quirk: 30-character limit. You have to be very concise. I took a lot of inspiration from Twitter, so in many ways it's a simplifyed version of that. I plan on hosting this on Heroku soon, but for now you can clone it locally. I hope you enjoy!

## Usage

The feature set is pretty simple, but you have most of the basic social media features: You can follow users, and like and comment on their posts. You can search for users. Users are recommended to you. And you can edit your profile.

## Installation

After cloning the repo, you'll first have to configure the database. First, cd into `/nibbl_app_api`. I used Postgres, so you'll have to set up a local Postgres server and add your credentials either directly to database.yml, or set them as environment variables. After that's done, run `rails db:create` and `rails db:migrate` to set up the tables, and `rails db:seed` if you want to set some fake users. After that, cd into the frontend directory, `/nibbl_app_frontend`, and run `yarn` and `yarn start`. It can then be viewed at localhost:3000. Enjoy!

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/gavinsharkey/nibbl_app_react_project.


## License

This app is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).