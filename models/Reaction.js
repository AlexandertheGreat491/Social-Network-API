// import statements

//imports Mongoose into the schema
const { Schema, Type } = require("mongoose");

// imports the logic to format the data entered into the createdAt field
const dateFormat = require("../utils/dateFormat");