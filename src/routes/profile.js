const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

//PROFILE API
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//PROFILE EDIT API
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.send("Successfully Updated");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = { profileRouter };
