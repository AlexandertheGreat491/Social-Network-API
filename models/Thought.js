//import statements
const { Schema, model, Types } = require("mongoose");
// imports the logic to format the data entered into the createdAt fields
const dateFormat = require('../utils/dateFormat');


//reaction schema will go here


const thoughtSchema = new Schema(
    
        {
            thoughtText: {
                type: String,
                required: true,
                maxLength: 280
            },
        }
    
)