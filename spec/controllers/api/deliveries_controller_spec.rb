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

  describe "POST #create" do
    before(:each) do
      request.headers.merge('Authorization' => "token #{JsonWebToken.encode({id: @admin.id})}")
      @delivery_hash = {
        invoice_number: "156789", cod: 95, address: "test address", phone_number: "718 896 5365"
      }
    end

    it "creates a delivery for the correct route" do
      route_delivery_count = @route.deliveries.count

      post :create, params: {route_id: @route.id, delivery: @delivery_hash}

      expect(response.status).to eq(201) # expect response to be created

      # returns the new item
      expect(json["invoice_number"]).to eq(@delivery_hash[:invoice_number])
      expect(json["cod"]).to eq(@delivery_hash[:cod])
      expect(json["address"]).to eq(@delivery_hash[:address])
      expect(json["phone_number"]).to eq(@delivery_hash[:phone_number])


      expect(@route.deliveries.count).to eq(route_delivery_count + 1)
      expect(@route.deliveries.last.invoice_number).to eq(@delivery_hash[:invoice_number])
    end

    it "requires manager permissions" do
      @admin.update(role: "agent")
      post :create, params: {route_id: @route.id, delivery: @delivery_hash}

      expect(response.status).to eq(403)
    end
  end

  describe "PUT/PATCH #update" do
    before(:each) do
      request.headers.merge('Authorization' => "token #{JsonWebToken.encode({id: @admin.id})}")
    end

    it "updates the correct delivery" do
      put :update, params: {route_id: @route.id, id: @delivery.id, delivery: {delivered: true}}

      @delivery.reload
      expect(@delivery.delivered).to eq(true)
    end

    it "requires driver permissions" do
      @admin.update(role: "agent")
      put :update, params: {route_id: @route.id, id: @delivery.id, delivery: {delivered: true}}

      expect(response.status).to eq(403)
    end
  end

  describe "DELETE #destroy" do
    before(:each) do
      request.headers.merge('Authorization' => "token #{JsonWebToken.encode({id: @admin.id})}")
    end

    it "destroys the correct delivery" do
      route_delivery_count = @route.deliveries.count
      delete :destroy, params: {route_id: @route.id, id: @delivery.id}

      expect(@route.deliveries.count).to eq(route_delivery_count - 1)
      expect(Delivery.find_by(id: @delivery.id)).to eq(nil)
    end

    it "requires manager permissions" do
      @admin.update(role: "agent")
      delete :destroy, params: {route_id: @route.id, id: @delivery.id}

      expect(response.status).to eq(403)
    end
  end


  describe "GET #track_invoice" do
    it "returns a list of deliveries with given invoice number" do
      invoice_number = "12345"
      delivery1 = @route.deliveries.create(invoice_number: invoice_number)
      delivery2 = @route.deliveries.create(invoice_number: invoice_number)

      get :track_invoice, params: {invoice_number: invoice_number}

      expect(json.length).to eq(2)
      expect(json[0]["id"]).to eq(delivery1.id)
      expect(json[1]["id"]).to eq(delivery2.id)
    end
  end

  describe "GET #track_number" do
    it "returns a list of deliveries with given tracking number" do
      get :track_number, params: {tracking_number: @delivery.tracking_number}

      expect(json.length).to eq(1)
      expect(json[0]["id"]).to eq(@delivery.id)
    end
  end

end
