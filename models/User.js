// require statement for Mongoose
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  // username field
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  // email field
  email: {
    type: String,
    unique: true,
    required: true,
    match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        "Please enter a valid email address!"
    ],
  },
});
