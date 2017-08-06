require 'rails_helper'

RSpec.describe Api::LoginController, type: :controller do

  describe "POST #login" do

    before(:each) do
      @user = User.create(username: "username", password: "password", password_confirmation: "password", email: "test@test.com")
    end

    describe "Invalid login:" do

      it "returns http unauthorized" do
        post :login
        expect(response).to have_http_status(:unauthorized)
      end

      it "returns http unauthorized for invalid username" do
        post :login, params: { username: "local", password: "password" }
        expect(response).to have_http_status(:unauthorized)
      end

      it "returns http unauthorized for invalid password" do
        post :login, params: { username: "localhost", password: "pass" }
        expect(response).to have_http_status(:unauthorized)
      end

      it "returns 'Username and password are incorrect' message for invalid response" do
        post :login
        expect(json["message"]).to eq("Username and password are incorrect")
      end

    end

    describe "Valid login:" do

      before(:each) do
        post :login, params: { username: "username", password: "password" }
      end

      it "returns http success" do
        expect(response).to have_http_status(:success)
      end

      it "returns 'Login Successful' as message" do
        expect(json["message"]).to eq('Login Successful')
      end

      it "returns a token as token" do
        expect(json["token"]).to_not eq(nil)
      end

      describe "JWT token" do

        before(:each) do
          post :login, params: { username: @user.username, password: @user.password }
          @payload = JsonWebToken.decode(json["token"])
        end

        it "is valid" do
          expect(JsonWebToken.valid_payload?(@payload))
        end

        it "contains the id" do
          expect(@payload[:id]).to eq(@user.id)
        end

        it "contains the usernname" do
          expect(@payload[:username]).to eq(@user.username)
        end

        it "contains the email" do
          expect(@payload[:email]).to eq(@user.email)
        end
        
      end # end JWT token
    end # end valid login
  end # end POST #login
end
