Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope '/api/v1' do
    get '/users/search', to: 'users#search'
    get '/users/to_follow', to: 'users#to_follow'
    resources :users, only: [:create, :show, :update]
    resources :posts
    resources :comments, only: [:index, :create, :update, :destroy]
    resources :likes, only: [:create, :destroy]
    resources :follows, only: [:create, :destroy]
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    get '/logged_in', to: 'sessions#is_logged_in'
  end
end
