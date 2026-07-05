const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const { requestRouter } = require("./routes/request");
const { profileRouter } = require("./routes/profile");
const { authRouter } = require("./routes/auth");
const port = 3000;

app.use(express.json());
app.use(cookieParser());

async function createIndexes() {
  await User.syncIndexes(); // creates the unique index from schema
}
createIndexes();

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
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
