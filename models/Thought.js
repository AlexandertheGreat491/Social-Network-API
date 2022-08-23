//import statements
const { Schema, model, Types } = require("mongoose");
// imports the logic to format the data entered into the createdAt fields
const dateFormat = require('../utils/dateFormat');


//reaction schema will go here


const thoughtSchema = new Schema(
    
        {
            // thoughtText field that has between 1 and 280 characters
            thoughtText: {
                type: String,
                required: true,
                maxLength: 280
            },
            // createdAt field that will have the current timestamp
            createdAt: {
                type: Date,
                default: Date.now,
                get: (createdAtVal) => dateFormat(createdAtVal),
            },
            username: {
                type: String,
                required: true,
            },
        }
    
)