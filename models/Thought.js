//import statements
const { Schema, model, Types } = require("mongoose");
// imports the logic to format dates
const dateFormat = require("../utils/dateFormat");

// the reaction schema is associated with the thought model & schema
// reaction schema only, no model
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
    
}
);

// thoughtSchema
const thoughtSchema = new Schema({
  // thoughtText field that has at least 1 character and not more than 280 characters
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  // createdAt field that will have the current timestamp
  createdAt: {
    type: Date,
    default: Date.now,
    // formats the date
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

// the reactionCount virtual retrieves the length of the thought's reaction array field on query
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

// exports the Thought model
module.exports = Thought;
