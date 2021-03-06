# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170806163053) do

  create_table "deliveries", force: :cascade do |t|
    t.string "invoice_number"
    t.integer "route_id"
    t.datetime "delivered_at"
    t.float "cod", default: 0.0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "address"
    t.string "phone_number"
    t.boolean "delivered", default: false
    t.string "tracking_number"
    t.index ["route_id"], name: "index_deliveries_on_route_id"
    t.index ["tracking_number"], name: "index_deliveries_on_tracking_number", unique: true
  end

  create_table "routes", force: :cascade do |t|
    t.string "log_number", null: false
    t.integer "user_id"
    t.integer "status", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "truck_id"
    t.index ["truck_id"], name: "index_routes_on_truck_id"
    t.index ["user_id"], name: "index_routes_on_user_id"
  end

  create_table "trucks", force: :cascade do |t|
    t.string "name"
    t.string "licence"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "role", default: 0
  end

end
