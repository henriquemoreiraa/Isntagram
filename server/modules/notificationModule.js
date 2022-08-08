const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userImg: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);
