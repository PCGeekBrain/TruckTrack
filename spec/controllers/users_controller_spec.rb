require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do

  before(:each) do
    @user = User.create(
        username: "username", password: "password", 
        email: "test@test.com", role: "agent"
      )
    @admin = User.create(
        username: "adminuser", password: "securepassword", 
        email: "admin@site.com", role: "admin"
      )
    @token = JsonWebToken.encode({username: @user.username, id: @user.id, email: @user.email})
    @admin_token = JsonWebToken.encode({username: @admin.username, id: @admin.id, email: @admin.email})
  end

  describe "GET #show" do
    
    it "returns user data for plain users" do
      request.headers.merge('Authorization' => "token #{@token}")
      get :show

      expect(json["username"]).to eq(@user.username)
      expect(json["email"]).to eq(@user.email)
      expect(json["role"]).to eq(@user.role)
    end

    it "returns http unauthorized if no token is provided" do
      get :show

      expect(response.status).to eq(401)
    end

  end

  describe "POST #create" do

    let(:username){"new_user_name"}
    let(:email){"test@test.com"}

    it "creates a new user" do
      request.headers.merge('Authorization' => "token #{@admin_token}")
      user_count = User.count

      post :create, params: {user: {username: username, password: "password", email: email}}

      expect(User.count).to eq(user_count + 1)
      expect(User.last.username).to eq(username)
      expect(User.last.email).to eq(email)
    end

    it "returns http forbidden if user is not admin" do
      request.headers.merge('Authorization' => "token #{@token}")
      user_count = User.count

      post :create, params: {user: {username: username, password: "password", email: email}}

      expect(User.count).to eq(user_count)
      expect(response.status).to eq(403)
    end

  end

  describe "PUT/PATCH #update" do

    let(:username){"updated_username"}

    it "updates the correct user" do
      request.headers.merge('Authorization' => "token #{@admin_token}")
      post :update, params: {id: User.first.id, user: {username: username}}

      expect(response.status).to eq(202)
      expect(User.first.username).to eq(username)
    end

    it "returns http forbidden if user is not admin" do
      request.headers.merge('Authorization' => "token #{@token}")
      post :update, params: {id: User.first.id, user: {username: username}}

      expect(response.status).to eq(403)
      expect(User.first.username).to_not eq(username)
    end

  end

  describe "DELETE #destroy" do

    it "deletes the correct user" do
      user = User.create(username: "tmp_user", password: "password")
      request.headers.merge('Authorization' => "token #{@admin_token}")
      delete :destroy, params: {id: user.id}

      expect(User.find_by(id: user.id)).to eq(nil)
    end

    it "returns http unauthorized if user is not admin" do
      request.headers.merge('Authorization' => "token #{@token}")
      delete :destroy, params: {id: @user.id}

      expect(User.find_by(id: @user.id)).to eq(@user)
      expect(response.status).to eq(403)
    end

  end
end