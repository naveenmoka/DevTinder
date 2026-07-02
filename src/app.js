const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
const port = 3000;

app.use(express.json());
app.use(cookieParser());

async function createIndexes() {
  await User.syncIndexes(); // creates the unique index from schema
}
createIndexes();

//Add data to the database
app.post("/signup", async (req, res) => {
  try {
    //Validating the data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

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

// Get first one user by firstName
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

//GET FEED API - Get all users at once by feed API
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch {
    res.status(404).send("something went wrong");
  }
});

//DELETE USER API - Delete user by its UserId
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

//PATCH USER BY ID API - Update some details of user by its userId
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills?.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User Details Updated Successfully");
  } catch (err) {
    res.status(400).send("Update Failed" + err.message);
  }
});

//LOGIN API
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    // const normalizedEmail = (emailId || "").toLowerCase();
    // console.log(emailId, normalizedEmail);

    //the database method expects a query object, not a raw string - ({emaild}) not (emailId)
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      //Create jwt token
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790");

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

//PROFILE API
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//SendConnection Request API
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user);
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
