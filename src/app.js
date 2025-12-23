const express = require("express");
const app = express();
const port = 3000; // Define your port here

// app.get("/user", (req, res) => {
//   console.log("It will go to infinite response loop for some time");
// });
// app.use(
//   "/user",
//   (req, res, next) => {
//     next();
//     res.send("Response 1!!");
//   },
//   (req, res) => {
//     res.send("Response2 !!");
//   }
// );
app.use("/user", [
  (req, res, next) => {
    console.log("Response1 !!");

    next();
  },
  (req, res, next) => {
    console.log("Response2 !!");

    next();
  },
  (req, res, next) => {
    res.send("Response 3");
  },
]);

app.listen(port, () => {
  console.log("Server started running on the port " + port);
});
