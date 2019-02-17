//name, email, message
const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateSendingMessage(data) {
  let errors = {};

  //if empty return "" for validator
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.message = !isEmpty(data.message) ? data.message : "";
  // if it's not valid return err
  // ordering matteres on which statement will return

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // if it's not valid length
  if (!Validator.isLength(data.message.trim(), { min: 2, max: 30 })) {
    errors.message = "Message must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.message)) {
    errors.message = "Message field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
