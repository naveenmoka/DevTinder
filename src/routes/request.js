const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

//SendConnection Request API
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user);
});

module.exports = { requestRouter };
