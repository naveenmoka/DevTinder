const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Enter the valid Name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter the valid Email Address");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a Strong Password");
  }
};
module.exports = { validateSignUpData };
