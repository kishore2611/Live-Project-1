const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    fullName: {
      type: String,
      maxLength: 30,
      minLength: 3,
      default: null,
    },
    email: {
      type: String,
      // unique: true,
      match: [
        /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
    },
    confirmPassword: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    membership: {
      type: String,
      default: null,
    },
    // userLocation: {
    //   location: {
    //     type: String,
    //     default: null,
    //   },
    //   type: {
    //     type: String,
    //     enum: ["Point"], 
    //     required: false,
    //     default: "Point",
    //   },
    //   coordinates: {
    //     type: [Number],
    //     required: false,
    //   },
    // }
    verification_code: {
      type: Number,
      default: null,
    },
    is_complete:{
      type: Number,
      default: 0,
    },
    is_verified: {
      type: Number,
      default: 0,
    },
    is_favourite:{
      type: Number,
      default: 0,
    },
    is_notification: {
      type: Number,
      default: 1,
    },
    is_blocked: {
      type: Number,
      default: 0,
    },
    // role: {
    //   type: String,
    //   default: "user",
    // },
    //social login
    user_social_token: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    user_social_type: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    user_device_type: {
      type: String,
      required: false,
      // trim: true,
      default: null,
    },
    user_device_token: {
      type: String,
      required: false,
      // trim: true,
      default: null,
    },
    user_authentication: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
