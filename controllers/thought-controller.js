// imports the Thought and User models
const { Thought, User } = require("../models");

const thoughtController = {
  // the getAllThoughts method gets all thoughts shared by users
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },

  // gets a specific thought by it's id, using the getThoughtById method
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // creates a new thought for a specific user, using the createThought method
  createThought({ params, body }, res) {
    Thought.create(body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user was found with this id." });
          return;
        }
        res.json({ message: "The thought was successfully created!" });
      })
      .catch((err) => res.json(err));
  },

  // the updateThought method is used to updated thoughts by id and data is validated
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
    .then(dbThoughtData => {
      if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id.' });
          return;
      }
      res.json(dbThoughtData);
  })
  .catch(err => res.status(400).json(err));
  },

  // the deleteThought method removes a thought from a specific user by id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id.' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.status(400).json(err));
  },

  // the addReaction method will allow reactions to be added to thoughts
  // new data that is entered will be validated
  addReaction({ params, body }, res) {
    // a reaction is added to a thought by id and data is validated
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        // when the specific thought that the user is attempting to add the reaction to cannot be found by the id
        // the message will appear in the json
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "No thought was found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // the removeReaction method deletes a thought by using the id of the thought and the reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};

// exports the thoughtController
module.exports = thoughtController;
