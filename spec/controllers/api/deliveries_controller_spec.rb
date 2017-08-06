require 'rails_helper'

RSpec.describe Api::DeliveriesController, type: :controller do

  before(:each) do
    @admin = User.create(role: "admin", username: "localhost", password: "password")
    @truck = Truck.create(name: "truck1")
    @route = Route.create(driver: @admin, truck: @truck, log_number: "test1234")
    @delivery = @route.deliveries.create(invoice_number: "156795")
  end

  it "requires authentication" do
    get :index, params: {route_id: @route.id}
    expect(response.status).to eq(401)
  end

  describe "GET #index" do
    before(:each) do
      request.headers.merge('Authorization' => "token #{JsonWebToken.encode({id: @admin.id})}")
    end

    it "returns a list of all deliveries for the route" do
      get :index, params: {route_id: @route.id}

      expect(response.status).to eq(200)
      expect(json.length).to eq(@route.deliveries.count)
    end

    it "returned list does not include deliveries for other routes" do
      route2 = Route.create(driver: @admin, truck: @truck, log_number: "test5678")
      route2.deliveries.create(invoice_number: "157002")
      route2.deliveries.create(invoice_number: "157012")
      route2.deliveries.create(invoice_number: "157032")

      get :index, params: {route_id: route2.id}
      
      expect(response.status).to eq(200)
      expect(json.length).to eq(route2.deliveries.count)
      expect(json[0]["invoice_number"]).to eq("157002")
    end
  end

  describe "GET #show" do
    before(:each) do
      request.headers.merge('Authorization' => "token #{JsonWebToken.encode({id: @admin.id})}")
      get :show, params: {route_id: @route.id, id: @delivery.id}
    end

    it "should return http success" do
      expect(response.status).to eq(200)
    end

    it "should include invoice_number" do
      expect(json["invoice_number"]).to eq(@delivery.invoice_number)
    end

    it "should include delivered_at" do
      expect(json["delivered_at"]).to eq(@delivery.delivered_at)
    end

    it "should include cod" do
      expect(json["cod"]).to eq(@delivery.cod)
    end

    it "should include address" do
      expect(json["address"]).to eq(@delivery.address)
    end

    it "should include phone_number" do
      expect(json["phone_number"]).to eq(@delivery.phone_number)
    end

    it "should include delivered" do
      expect(json["delivered"]).to eq(@delivery.delivered)
    end

    it "should include tracking_number" do
      expect(json["tracking_number"]).to eq(@delivery.tracking_number)
    end

    # TODO test status
    describe "status" do
      it "returns the routes status" do
        expect(json["status"]).to eq(@delivery.route.status)
      end

      it "returns 'delivered' if delivered is set to true" do
        @delivery.update(delivered: true)
        get :show, params: {route_id: @route.id, id: @delivery.id} # reload the page to get the updated status
        
        expect(json["status"]).to eq("delivered")
      end
    end
  end

  describe "POST #create"

  describe "PUT/PATCH #update"

  describe "DELETE #destroy"

end
