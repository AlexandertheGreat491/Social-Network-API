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

// thought routes

// /api/thoughts
// GET for all thoughts and POST for newly created thoughts
router.route("/").get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
// route will GET, PUT (update), and DELETE thoughts by id
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:id/reactions
// POST route to add a reaction to a thought
// DELETE route to remove a specific reaction from a particular thought
router.route("/:id/reactions").post(addReaction);

router.route("/:id/reactions/:reactionId").delete(removeReaction);

// exports the thought routes
module.exports = router;
