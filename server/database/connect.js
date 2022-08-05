const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = mongoose.connect(`${process.env.MONGODB_URL}`);

    console.log("Database connected");
  } catch (error) {
    console.log("Error on database", error);
    process.exit(1);
  }
};

module.exports = connectDB;
