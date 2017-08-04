require 'rails_helper'

RSpec.describe Route, type: :model do

  describe "Fields:" do

    let(:route){Route.new}

    it "has a log_number" do
      expect(route).to respond_to(:log_number)
    end
    
    it "has a enum status that defaults to 0" do
      expect(route).to respond_to(:status)
      expect(Route.statuses[route.status]).to eq(0)
    end
  
  end

  describe "Relationships:" do

    before(:each) do
      @user = User.create(username: "localhost", password: "password", password_confirmation: "password")
      @route = Route.new(:log_number => "001")
    end

    it "belongs to a user, aliased as driver" do
      expect(@route.driver).to eq(nil)
      expect(@route.user_id).to eq(nil)
      @route.driver = @user
      expect(@route.driver).to eq(@user)
      expect(@route.user_id).to eq(@user.id)
    end

    it "belongs to a truck" do
      expect(@route.truck).to eq(nil)

      truck = Truck.create(name: "truck1")
      @route.update(truck: truck)

      expect(@route.truck).to eq(truck)
      binding.pry
      expect(truck.routes.first).to eq(@route)
    end

    it "has many deliveries"

    it "has many comments through deliveries"

  end

  describe "Validations:" do
    
    it "requires presence for log_number" do
      route = Route.new
      route.valid?
      expect(route.errors).to include(:log_number)
    end

  end

end
