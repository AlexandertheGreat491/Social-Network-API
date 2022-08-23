// import statements

//imports Mongoose into the schema
const { Schema, Type, Types } = require("mongoose");

// imports the logic to format the data entered into the createdAt field
const dateFormat = require("../utils/dateFormat");

// the reaction schema is associated with the thought model & schema
// reaction schema only
const reactionSchema = new Schema({
  // reactioinId field
  // sets a custom id to prevent confusion with the parent id
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  // reactionBody field
  // this field will have a maximum of 280 characters
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  // username field
  username: {
    type: String,
    required: true,
  },
  // createdAt field
  // all reactions will be timestamped in a specific format on query
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  }
},
{
    toJSON: {
        getters: true
    },
    id: false
}
);

// exports the reaction.Schema
module.exports = reactionSchema;