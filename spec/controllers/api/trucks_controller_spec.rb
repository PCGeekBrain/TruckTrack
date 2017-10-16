require 'rails_helper'

RSpec.describe Api::TrucksController, type: :controller do

  before(:each) do |data|
    @user = User.create(username: "localhost", password: "password", role: "admin")
    @truck = Truck.create(name: "test Truck", licence: "DOG4U")
    @token = JsonWebToken.encode({id: @user.id})

    @user.update(role: "agent") if data.metadata[:set_agent]
  end

  it "requires authentication" do
    get :index
    expect(response.status).to eq(401)
  end

  describe "GET #index" do
    before(:each) do
      request.headers.merge('Authorization' => "token #{@token}")
      get :index
    end

    it "returns http success" do
      expect(response.status).to eq(200)
    end
    
    it "returns a list of all trucks" do
      expect(json.length).to eq(Truck.count)
    end
  
  end

  describe "GET #show" do

    before(:each) do
      request.headers.merge('Authorization' => "token #{@token}")
      get :show, params: {id: @truck.id}
    end

    it "returns http success" do
      expect(response.status).to eq(200)
    end

    it "returns id" do
      expect(json["id"]).to eq(@truck.id)
    end

    it "returns name" do
      expect(json["name"]).to eq(@truck.name)
    end

    it "returns licence" do
      expect(json["licence"]).to eq(@truck.licence)
    end

  end

  describe "POST #create" do

    before(:each) do |data|
      @truck_count = Truck.count
      request.headers.merge('Authorization' => "token #{@token}")
      post :create, params: {truck: {name: "new truck", licence: "CAT4U"}} unless data.metadata[:skip_before]
    end

    it "returns http create" do
      expect(response.status).to eq(201)
    end

    it "creates a new truck" do
      expect(Truck.count).to_not eq(@truck_count)

      new_truck = Truck.last
      expect(new_truck.name).to eq("new truck")
      expect(new_truck.licence).to eq("CAT4U")
    end

    it "requires manager permissions", set_agent: true do
      expect(response.status).to eq(403)
    end

  end

  describe "PUT/PATCH #update" do

    before(:each) do
      request.headers.merge('Authorization' => "token #{@token}")
      put :update, params: {id: @truck.id, truck: {name: "new truck"}}
    end

    it "returns http accepted" do
      expect(response.status).to eq(202)
    end

    it "updates the truck" do
      @truck.reload
      expect(@truck.name).to eq("new truck")
    end

    it "requires manager permissions", set_agent: true do
      expect(response.status).to eq(403)
    end

  end

  describe "DELETE #destroy" do

    before(:each) do |data|
      request.headers.merge('Authorization' => "token #{@token}")
      delete :destroy, params: {id: @truck.id}
    end

    it "returns http no content" do
      expect(response.status).to eq(204)
    end

    it "destroys the truck" do
      expect(Truck.find_by(id: @truck.id)).to eq(nil)
    end

    it "requires manager permissions", set_agent: true do
      expect(response.status).to eq(403)
    end

  end

end
