class AddDefaultValueToDeliveredOnDeliveries < ActiveRecord::Migration[5.1]
  def up
    change_column :deliveries, :delivered, :boolean, default: false
  end
  
  def down
    change_column :deliveries, :delivered, :boolean, default: nil
  end
end
