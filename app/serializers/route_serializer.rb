class RouteSerializer < ActiveModel::Serializer
  attributes :id, :log_number, :status, :delivery_count, :updated_at
  belongs_to :driver, serializer: DriverSerializer
  belongs_to :truck, serializer: TruckSerializer

  def delivery_count
    object.deliveries.count
  end
end
