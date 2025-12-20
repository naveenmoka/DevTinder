const express = require("express");
const app = express();
const port = 3000;

app.use("/test", (req, res) => {
  res.send("Another Route - test");
});
app.use((req, res) => {
  res.send("Server Started");
});

app.listen(port, () => {
  console.log("Server started running on the port " + port);
});
