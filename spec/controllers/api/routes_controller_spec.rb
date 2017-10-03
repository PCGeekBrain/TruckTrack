require 'rails_helper'

RSpec.describe Api::RoutesController, type: :controller do

  before(:each) do
    @user = User.create(username: "localhost", password: "password", role: "admin")
    @truck = Truck.create(name: "truck")
  end

  it "requires authentication" do
    get :index
    expect(response.status).to eq(401)
  end
  
  describe "GET #index" do

    before(:each) do
      # create the route
      @route = Route.create(log_number: "12345", driver: @user, truck: @truck)
      # create the token and make the request
      token = JsonWebToken.encode({id: @user.id})
      request.headers.merge('Authorization' => "token #{token}")
      # make the request
      get :index
    end

    it "returns a list of all routes" do
      expect(json.length).to eq(Route.count)
    end

    it "returns each routes id" do
      expect(json[-1]["id"]).to eq(@route.id)
    end

    it "returns each routes status" do
      expect(json[-1]["status"]).to eq(@route.status)
    end

    it "returns each routes log number" do
      expect(json[-1]["log_number"]).to eq(@route.log_number)
    end

  end

  describe "GET #index when user is driver" do
    before(:each) do
      @driver = User.create(role: "driver", username: "driver123", password: "password")
    end

    it "only returns that drivers routes" do
      route1 = Route.create(driver: @user, truck: @truck, log_number: "11111")
      route2 = Route.create(driver: @driver, truck: @truck, log_number: "22222")

      request.headers.merge('Authorization' => "token #{JsonWebToken.encode({id: @driver.id})}")
      get :index

      expect(json.count).to_not eq(Route.count)
      expect(json.count).to eq(@driver.routes.count)

      expect(json[-1]["id"]).to eq(route2.id)
    end
  end

  describe "GET #show" do
    before(:each) do
      # create the user truck and route
      @route = Route.create(log_number: "12345", driver: @user, truck: @truck)
      # create the token and make the request
      token = JsonWebToken.encode({id: @user.id})
      request.headers.merge('Authorization' => "token #{token}")
      # make the request
      get :show, params: {id: @route.id}
    end

    it "returns the status" do
      expect(json["status"]).to eq(@route.status)
    end

    it "returns the log number" do
      expect(json["log_number"]).to eq(@route.log_number)
    end

    it "returns the delivery count" do
      expect(json["delivery_count"]).to eq(@route.deliveries.count)
    end

    it "returns the drivers username" do
      expect(json["driver"]["username"]).to eq(@route.driver.username)
    end

    it "returns the truck name" do
      expect(json["truck"]["name"]).to eq(@route.truck.name)
    end

    it "returns the trucks id" do
      expect(json["truck"]["id"]).to eq(@route.truck.id)
    end
  end

  describe "POST #create" do

    before(:each) do
      @route_count = Route.count
    end

    it "it creates a new route" do
      request.headers.merge('Authorization' => "token #{JsonWebToken.encode({id: @user.id})}")
      post :create, params: {route: {user_id: @user.id, truck_id: @truck.id, log_number: "15896"}}

      expect(response.status).to eq(201)

      expect(Route.count).to eq(@route_count + 1)
      expect(Route.last.log_number).to eq("15896")
      expect(Route.last.driver).to eq(@user)
      expect(Route.last.truck).to eq(@truck)
    end

    it "returns http unauthorized if user is not a manger or higher" do
      @user.update(role: "agent") # change the user role
      request.headers.merge('Authorization' => "token #{JsonWebToken.encode({id: @user.id})}")
      post :create, params: {route: {user_id: @user.id, truck_id: @truck.id, log_number: "15896"}}

      expect(response.status).to eq(403)
      expect(Route.count).to eq(@route_count)
    end
  end

  describe "PUT/PATCH #update" do
    before(:each) do
      @route = Route.create(driver: @user, truck: @truck, log_number: "12345")
    end

    it "it updates the route" do
      request.headers.merge('Authorization' => "token #{JsonWebToken.encode({id: @user.id})}")
      post :update, params: {id: @route.id, route: {status: "loaded"}}

      @route.reload
      expect(@route.loaded?).to eq(true)
      expect(@route.status).to eq("loaded")
    end

    it "returns http unauthorized if user is not a manger or higher" do
      @user.update(role: "agent") # change the user role
      request.headers.merge('Authorization' => "token #{JsonWebToken.encode({id: @user.id})}")
      put :update, params: {id: @route.id, route: {status: "loaded"}}

      expect(response.status).to eq(403)
    end
  end

  describe "DELETE #destroy" do
    before(:each) do
      @route = Route.create(driver: @user, truck: @truck, log_number: "12345")
      @route_count = Route.count
    end

    it "it deletes the route" do
      request.headers.merge('Authorization' => "token #{JsonWebToken.encode({id: @user.id})}")
      delete :destroy, params: {id: @route.id}

      expect(Route.count).to eq(@route_count - 1)
      expect(Route.find_by(id: @route.id)).to eq(nil)
    end
    
    it "returns http unauthorized if user is not a manger or higher" do
      @user.update(role: "agent") # change the user role
      request.headers.merge('Authorization' => "token #{JsonWebToken.encode({id: @user.id})}")
      delete :destroy, params: {id: @route.id}

      expect(response.status).to eq(403)
    end
  end
  
end
