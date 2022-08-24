// imports the express library
const router = require('express').Router();

// imports the methods from the thought-controller
const {
    getAllThoughts,
    addThought,
    getThoughtById,
    updateThought,
    createThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
// GET for all thoughts and POST for newly created thoughts
router
.route('/')
.get(getAllThoughts)
.post(createThought)

// /api/thoughts/<thoughtId>
// route will GET thoughts by id & PUT (update) thoughts by id
router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
