Rails.application.routes.draw do
  root 'home#index'
  get 'home/index'
  get '/tags', to: 'home#index'
  get '/tag/:name', to: 'home#index'
  namespace :api do 
    namespace :v1 do 
     resources :tags, only: [:index, :create, :destroy, :update]
     resources :tasks, only: [:index, :create, :destroy, :update, :testing]
    end 
  end 
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
