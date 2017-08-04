#################################################
# EmailValidator
#
# enables email: true validation
#
# REGEX Copied from stackoverflow
#################################################

class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    # do not check for presence
    unless value.nil? || value == ""
      unless value =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
        record.errors[attribute] << (options[:message] || "is not a valid email address")
      end
    end
  end
end