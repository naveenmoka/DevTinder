const express = require("express");
const app = express();
const port = 3000;

app.use("/user", (req, res) => {
  res.send("Data locally Naveen");
});

app.get("/user", (req, res) => {
  res.send({ fistName: "Naveen", lastName: "Moka" });
});

app.post("/user", (req, res) => {
  res.send("Data Saved Successfully");
});

app.delete("/user", (req, res) => {
  res.send("Data deleted Successfully");
});
app.listen(port, () => {
  console.log("Server started running on the port " + port);
});
