Rails.application.routes.draw do
  
  namespace :api do
    # login
    post 'authenticate' => "login#login"

    # User routes
    resources :users
    get 'user/all' => "users#all"

    # Route routes
    resources :routes do
      # Deliveries Routes
      resources :deliveries
    end

    # Truck Routes
    resources :trucks

    # homepage tracking routes
    get 'deliveries/invoice/:invoice_number' => "deliveries#track_invoice", as: "track_invoice"
    get 'deliveries/tracking_number/:tracking_number' => "deliveries#track_number", as: "track_number"
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
