const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("connected to MongoDB");
  } catch (error) {
    console.log("error in MongoDB connection");
  }
};
module.exports = connectDB;
