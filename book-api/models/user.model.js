const mongoose = require("mongoose");
const Constant = require("../utils/constants");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      minlength: [3, "First Name must be at least 3 characters long"],
      maxlength: [50, "First Name must be less than 50 characters long"],
      match: [
        /^[A-Za-z]+$/,
        "First Name can only contain alphabetic characters",
      ],
    },
    lastName: {
      type: String,
      required: false,
      maxlength: [50, "Last Name must be less than 50 characters long"],
      match: [
        /^[A-Za-z]*$/,
        "Last Name can only contain alphabetic characters",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true, // Converts email to lowercase to avoid case sensitive issues
      match: [/.+\@.+\..+/, "Please enter a valid email address"], // Basic email format validation
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    role: {
      type: Number,
      default: Constant.USER_ROLE,
      enum: [Constant.ADMIN_ROLE, Constant.USER_ROLE], // Only allow predefined roles
    },
  },
  { timestamp: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
