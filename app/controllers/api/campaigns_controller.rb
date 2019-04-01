class Api::CampaignsController < ActionController::API
  WINNING_NUMBER = "613884922"

  def winners
    sleep 3
    if ActiveSupport::SecurityUtils.secure_compare(params[:number].to_s, WINNING_NUMBER)
      render json: { winner: true }
    else
      render json: { winner: false }
    end
  end
end
