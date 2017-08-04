class ChangeStatusToDeliveredOnDelivery < ActiveRecord::Migration[5.1]
  def change
    change_table :deliveries do |t|
      t.remove  :status
      t.boolean :delivered
    end
  end
end
