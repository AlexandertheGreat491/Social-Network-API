// import statements

//imports Mongoose into the schema
const { Schema, Type, Types } = require("mongoose");

// imports the logic to format the data entered into the createdAt field
const dateFormat = require("../utils/dateFormat");

// the reaction schema is associated with the thought model & schema
const reactionSchema = new Schema(
    {
        // sets a custom id to prevent confusion with the parent id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
    }
)