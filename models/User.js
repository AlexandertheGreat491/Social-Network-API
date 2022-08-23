// require statement for Mongoose
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
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
        "Please enter a valid email address!",
      ],
    },
    // thoughts field
    // includes an array of _id values referencing the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    // friends field
    // includes an array of _id values referencing the User model(self-reference)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
