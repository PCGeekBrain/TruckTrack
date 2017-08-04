class CreateRoutes < ActiveRecord::Migration[5.1]
  def change
    create_table :routes do |t|
      t.string :log_number, null: false
      t.belongs_to :user, foreign_key: true
      t.integer :status, default: 0

      t.timestamps
    end
  end
end
