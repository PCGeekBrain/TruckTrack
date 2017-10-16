#################################################
# PhoneValidator
#
# enables phone: true validation
#
# REGEX Copied from old learn-co lab that I wrote
#################################################

class PhoneValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    # do not check for presence
    unless value.nil? || value == ""
      unless value =~ /^\(?[0-9]{3}\)?[ ]?[0-9]{3}[- ]?[0-9]{4}$/
        record.errors[attribute] << (options[:message] || "is not a valid phone number")
      end
    end
  end
end