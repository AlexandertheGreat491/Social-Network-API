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
const {route} = require('./user-routes');

// /api/thoughts
// GET for all thoughts and POST for newly created thoughts
router
.route('/')
.get(getAllThoughts)

// /api/thoughts/:userId
router
.router('/:userId')
.post(addThought)

// /api/thoughts/:thoughtId
// route will GET thoughts by id, PUT (update) thoughts by id, and DELETE thoughts by id
router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)

// /api/thoughts/:userId/:thoughtId
router
.route(':/userId/:thoughtId')
.delete(removeThought)

// /api/thoughts/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.post(addReaction);

// /api/:thoughtId/reactions/:reactionId
router
.route(':/thoughtId/reactions/:reactionId')
.delete(removeReaction)

// exports the thought routes
module.exports = router;


