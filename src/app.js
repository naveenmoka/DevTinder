const express = require("express");
const app = express();
const port = 3000;

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});
app.get("/getUserData", (req, res) => {
  throw new Error("afoja");
  res.send("User Data sent");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    try {
      res.send("user Data sent");
    } catch (err) {
      res.status(500).send("Some Error contact support team");
    }
  }
});

app.listen(port, () => {
  console.log("Server started running on the port " + port);
});
