//import statements
const { Schema, model, Types } = require("mongoose");
// imports the logic to format the data entered into the createdAt fields
const dateFormat = require("../utils/dateFormat");
// imports the reactionSchema
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema({
  // thoughtText field that has between 1 and 280 characters
  thoughtText: {
    type: String,
    required: true,
    maxLength: 280,
  },
  // createdAt field that will have the current timestamp
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
  // username field
  username: {
    type: String,
    required: true,
  },
  // array of nested documents created with the reactionSchema
  // these are like replies
  reactions: [reactionSchema],
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
}
);

// the reactionCount virtual that retrieves the length of the thought's reaction array field on query
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

// exports the Thought model
module.exports = Thought;
