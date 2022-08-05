const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    user: {
      name: { type: String, required: true },
      user_img: { type: String, required: true },
      user_id: { type: String, required: true },
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    answers: [
      {
        answer: {
          type: String,
          required: true,
        },
        user: {
          name: { type: String, required: true },
          user_img: { type: String, required: true },
          user_id: { type: String, required: true },
        },
        likes: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comments", commentsSchema);
