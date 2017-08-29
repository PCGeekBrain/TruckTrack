class RouteSerializer < ActiveModel::Serializer
  attributes :id, :log_number, :status, :delivery_count, :updated_at, :user_id, :truck_id
  belongs_to :driver, serializer: DriverSerializer
  belongs_to :truck, serializer: TruckSerializer

  def delivery_count
    object.deliveries.length
  end
end
