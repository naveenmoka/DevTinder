const express = require("express");
const app = express();
const port = 3000; // Define your port here

// This matches: abc, abbc, abbbc...
app.get("/user/:userId", (req, res) => {
  console.log(req.params);
  res.send("Data locally Naveen");
});
app.get("/user", (req, res) => {
  console.log(req.query);
  res.send("Data locally Naveen");
});

app.get(/\/ab?c/, (req, res) => {
  res.send("Data locally Naveen");
});
app.get(/\/ab+c/, (req, res) => {
  res.send("Data locally Naveen");
});
app.get(/\/ab*c/, (req, res) => {
  res.send("Data locally Naveen");
});
app.get(/.fly$/, (req, res) => {
  res.send("Data locally Naveen");
});

app.listen(port, () => {
  console.log("Server started running on the port " + port);
});
