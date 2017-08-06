require 'rails_helper'

RSpec.describe Api::DeliveryController, type: :controller do

  before(:each) do
    @admin = User.create(role: "admin", username: "localhost", password: "password")
    @truck = Truck.create(name: "truck1")
    @route = Route.create(driver: @admin, truck: @truck, log_number: "test1234")
  end

  it "requires authentication" do
    get :index, params: {route_id: @route.id}
    expect(response.status).to eq(401)
  end

  describe "GET #index" do
    before(:each) do
      @user = User.create(username: "localhost", password: "password")
      @driver = User.create(username: "driveruser", password: "password", role: "driver")
    end
    it "returns a list of all deliveries"

    it "only returns a list of driver deliveries if the user is a driver"
  end

  describe "GET #show"

  describe "POST #create"

  describe "PUT/PATCH #update"

  describe "DELETE #destroy"

end
