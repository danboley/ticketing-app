Rails.application.routes.draw do
  resources :tickets
  root 'tickets#index'
  # Routing logic: fallback requests for React Router.
  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
  get '/favicon.ico', to: proc { [204, {}, ['']] }
end
