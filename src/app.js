const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const port = 3000;

app.use(express.json());
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("Data Added Successfully");
  } catch (err) {
    res.status(400).send("Error is " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userFirstName = req.body.firstName;
  try {
    const users = await User.findOne({ firstName: userFirstName });
    if (users.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch {
    res.status(404).send("something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch {
    res.status(404).send("something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("database connected successfully..");
    app.listen(port, () => {
      console.log("Server started running on the port " + port);
    });
  })
  .catch((err) => {
    console.error("database connection failed!..");
  });
