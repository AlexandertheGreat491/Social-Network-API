// imports the express library
const router = require('express').Router();

// imports the methods from the thought-controller
const {
    getAllThoughts,
    addThoughts,
    getThoughtById,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/user-controller');