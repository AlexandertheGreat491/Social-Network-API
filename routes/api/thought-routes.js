// imports the express library
const router = require("express").Router();

// imports the methods from the thought-controller
const {
  getAllThoughts,
  getThoughtById,
  updateThought,
  deleteThought,
  createThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

// /api/thoughts
// GET for all thoughts and POST for newly created thoughts
router.route("/").get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
// route will GET thoughts by id, PUT (update) thoughts by id, and DELETE thoughts by id
router.route("/:thoughtId").get(getThoughtById).put(updateThought);

// GET route to retrieve thoughts by their id
// PUT route to update thoughts by their id
// DELETE route to remove a thought from a specific user
router.route("/:id").get(getThoughtById).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
// DELETE route to remove a specific reaction from a particular thought
router.route(":/thoughtId/reactions").post(addReaction).delete(removeReaction);

// exports the thought routes
module.exports = router;
