const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

//Add data to the database
authRouter.post("/signup", async (req, res) => {
  try {
    //Validating the data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    //store the data
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("Data Added Successfully");
  } catch (err) {
    res.status(400).send("Error is " + err.message);
  }
});

//LOGIN API
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    //the database method expects a query object, not a raw string - ({emaild}) not (emailId)
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      //Create jwt token
      const token = await user.getJWT();

      //Add the token to the cookie and return response back
      res.cookie("token", token, {
        expires: new Date(Date.now() + 900000),
      });
      res.send("Login Successful!!!");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = { authRouter };
