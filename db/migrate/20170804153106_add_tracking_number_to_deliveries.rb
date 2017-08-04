class AddTrackingNumberToDeliveries < ActiveRecord::Migration[5.1]
  def change
    add_column :deliveries, :tracking_number, :string
  end
end
