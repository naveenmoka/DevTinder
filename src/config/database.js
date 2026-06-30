const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://naveenmoka053_db_user:BrLvQsqeOzG5u0FZ@namastenode.lozw2lf.mongodb.net/",
  );
};

module.exports = connectDB;
