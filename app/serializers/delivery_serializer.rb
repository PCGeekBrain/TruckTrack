class DeliverySerializer < ActiveModel::Serializer
  attributes :id, :invoice_number, :delivered_at, :cod, :address, 
             :phone_number, :delivered, :tracking_number, :status, :route_number

  def status
    if object.delivered
      "delivered"
    else
      object.route.status
    end
  end

  def route_number
    object.route.log_number if current_user
  end

end
