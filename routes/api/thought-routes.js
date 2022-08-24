// imports the express library
const router = require('express').Router();

// imports the methods from the thought-controller
const {
    getAllThoughts,
    addThought,
    getThoughtById,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');