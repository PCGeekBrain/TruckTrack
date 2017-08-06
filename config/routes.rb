Rails.application.routes.draw do
  
  namespace :api do
    # login
    post 'authenticate' => "login#login"

    # User routes
    resources :users
    get 'user/all' => "users#all"

    # Route routes
    resources :routes

    # Deliveries Routes

    # Truck Routes
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
