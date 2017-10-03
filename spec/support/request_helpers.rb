module Requests
  # help with JSON responses
  module JsonHelpers
    # get the json from the body
    def json
      JSON.parse(response.body)
    end
  end
end