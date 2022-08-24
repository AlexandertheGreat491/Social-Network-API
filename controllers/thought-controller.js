// imports the Thought and User models
const { Thought, User } = require("../models");

const thoughtController = {
  // gets all of the thoughts shared by users
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-_v",
      })
      .populate({
        path: "thoughts",
        select: "-_v",
      })
      .select("-_v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // get a specific thought by it's id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((dbThoughtData) => {
        // if a thought with a certain id is not found
        if (!dbThoughtData) {
          res.status(404).json({
            message: "The thought that you seek was not found with that id!",
          });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // add a thought to a user with the addThought method
  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        // if a thought cannot be added to a user, when the user is not present in the database
        if (!dbUserData) {
          res.status(404).json({
            message:
              "The user you are looking for cannot be found with this id!",
          });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  // the updateThought method is used to updated thoughts by id and data is validated
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
      new: true,
      runValidators: true,
    })
      .populate({ path: "reactions", select: "-_v" })
      .select("-_v")
      .then((dbThoughtData) => {
        // when a thought with a certain id is not found in the update query
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "No thought was found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // the removeThought method will allow a thought to be removed from a specific user by id
  removeThought({ params }, res) {
    // a specific thought is deleted using its id
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedThought) => {
        // if the thought with a certain id isn't found then the message shows in the json
        if (!deletedThought) {
          return res
            .status(404)
            .json({ message: "No thought was found with this id!" });
        }
        // if a thought is not found, a thought for a user can be updated using the id
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        // if the user is not found by the id, then the message will show in the json
        if (!dbUserData) {
          res.status(404).json({ message: "No user was found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  // the addReaction method will allow reactions to be added to thoughts
  addReaction({ params, body }, res) {
    // a reaction is added to a thought by id and data is validated
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        // when the specific thought that the user is attempting to add the reaction to cannot be found by the id
        // the message will appear in the json
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "No thought was found with this id!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
  // a reaction is removed from a thought by using the id of the thought and the reaction
  // any new data that is entered will be validated
  removeReaction({ params }, res) {
    console.log(params.thoughtId, params.reactionId);
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },
};

// exports the thoughtController
module.exports = thoughtController;
