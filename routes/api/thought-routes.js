// imports the express library
const router = require("express").Router();

// imports the methods from the thought-controller
const {
  getAllThoughts,
  addThought,
  getThoughtById,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");
// imports the user-routes
const { router } = require("./user-routes");

// /api/thoughts
// GET for all thoughts and POST for newly created thoughts
router.route("/").get(getAllThoughts);

// /api/thoughts/:userId
// POST route to add thoughts to a specific user
router.router("/:userId").post(addThought);

// /api/thoughts/:thoughtId
// route will GET thoughts by id, PUT (update) thoughts by id, and DELETE thoughts by id
router.route("/:thoughtId").get(getThoughtById).put(updateThought);

// /api/thoughts/:userId/:thoughtId
// DELETE route to remove a thought from a specific user
router.route(":/userId/:thoughtId").delete(removeThought);

// /api/thoughts/:thoughtId/reactions
// POST route to add reactions to a specific thought
router.route("/:thoughtId/reactions").post(addReaction);

// /api/:thoughtId/reactions/:reactionId
// DELETE route to remove a specific reaction from a particular thought
router.route(":/thoughtId/reactions/:reactionId").delete(removeReaction);

// exports the thought routes
module.exports = router;
