Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'pages#main'

  namespace :api, defaults: { format: :json } do
     post 'onefit-campaign', to: 'campaigns#winners'
  end

end
