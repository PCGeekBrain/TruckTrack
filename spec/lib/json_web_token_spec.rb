# Rspec tests for coustom JWT implamentation
require 'rails_helper';

RSpec.describe JsonWebToken do

  before(:each) do
    @payload = {foo: "bar"}
    @key = Rails.application.secrets.secret_key_base
  end

  describe ".encode" do

    before(:each) do
      @token = JsonWebToken.encode(@payload)
    end

    it "encodes a payload to a valid JWT token" do
      expect(JWT.decode(@token, @key)[0]["foo"]).to eq("bar")
    end

    it "signs the token with the Rails secret key base" do
      expect {JWT.decode(@token, "test.key")}.to raise_error(JWT::VerificationError)
    end

    it "defaults to a 7 day exparation window (as timestamp integer)" do
      exp = 7.day.from_now.to_i
      expect(JWT.decode(@token, @key)[0]).to include("exp")
      expect(JWT.decode(@token, @key)[0]["exp"]).to eq(exp)
    end

    it "accepts cusotom exparation windows" do
      exp = 1.day.from_now
      token = JsonWebToken.encode(@payload, exp)
      expect(JWT.decode(token, @key)[0]["exp"]).to eq(exp.to_i)
    end
  end

  describe ".decode" do
    it "decodes JWT encoded with .encode" do
      token = JsonWebToken.encode(@payload)
      decoded_token = JWT.decode(token, @key)

      expect(JsonWebToken.decode(token)).to eq(decoded_token[0])
    end

    it "returns nil for invalid tokens" do
      expect(JsonWebToken.decode("")).to eq(nil)
      
      token = JWT.encode(@payload, "bad_sig")
      expect(JsonWebToken.decode(token)).to eq(nil)
    end
  end

  describe ".valid_payload?" do
    it "returns true for valid payloads" do
      payload = {"exp" => 5.days.from_now.to_i}

      expect(JsonWebToken.valid_payload?(payload)).to eq(true)
    end

    it "returns false for invalid payloads" do
      payload = {"exp" => 5.days.ago.to_i}

      expect(JsonWebToken.valid_payload?(payload)).to eq(false)
    end
  end

  describe ".expired?" do

    it "returns true if exp key is in the past" do
      payload = {"exp" => 5.days.ago.to_i}
      expect(JsonWebToken.expired?(payload)).to eq(true)
    end

    it "returns false if exp key is in the future" do
      payload = {"exp" => 5.days.from_now.to_i}
      expect(JsonWebToken.expired?(payload)).to eq(false)
    end
  end

end