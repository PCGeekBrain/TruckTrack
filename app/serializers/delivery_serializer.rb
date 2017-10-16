class DeliverySerializer < ActiveModel::Serializer
  attributes :id, :invoice_number, :delivered_at, :cod, :address, :phone_number, :delivered, :tracking_number, :status

  def status
    if object.delivered
      "delivered"
    else
      object.route.status
    end
  end
end
