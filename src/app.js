const express = require("express");
const app = express();
const port = 3000;
const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.use("/admin/getAllData", (req, res) => {
  res.send("All Data Sent");
});
app.get("/user/login", (req, res) => {
  res.send("User Login successfully");
});
app.get("/user", userAuth, (req, res) => {
  res.send("user Data Sent");
});
app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});

app.listen(port, () => {
  console.log("Server started running on the port " + port);
});
