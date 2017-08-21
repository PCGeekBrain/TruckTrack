Rails.application.routes.draw do
  
  namespace :api do
    # login
    post 'authenticate' => "login#login"

    # User routes
    get 'users/all' => "users#all"
    get 'users/drivers' => "users#drivers"

    resources :users

    get 'routes/options' => "routes#options", as: "route_status_options"

    # Route routes
    resources :routes do
      # Deliveries Routes
      resources :deliveries
    end

    # Truck Routes
    resources :trucks

    # homepage tracking routes
    get 'search/invoice/:invoice_number' => "deliveries#track_invoice", as: "track_invoice"
    get 'search/tracking/:tracking_number' => "deliveries#track_number", as: "track_number"
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
