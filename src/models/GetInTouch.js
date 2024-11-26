const mongoose = require("mongoose");

const GetInTouchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const GetInTouch = mongoose.model("GetInTouch", GetInTouchSchema);

module.exports = { GetInTouch };
