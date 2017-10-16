class AddTrackingNumberToDeliveries < ActiveRecord::Migration[5.1]
  def change
    add_column :deliveries, :tracking_number, :string
    add_index :deliveries, :tracking_number, :unique => true
  end
end
