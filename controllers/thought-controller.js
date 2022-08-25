// imports the Thought and User models
const { Thought, User } = require("../models");

const thoughtController = {
  // gets all of the thoughts shared by users
  getAllThoughts(req, res) {
    Thought.find({})
    .populate({ path: 'reactions', select: '-__v' })
    .select('-__v')
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.status(500).json(err))
},

  // get a specific thought by it's id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
    .populate({ path: 'reactions', select: '-__v' })
    .select('-__v')
    .then(dbThoughtData =>  dbThoughtData ? res.json(dbThoughtData) : res.status(404).json({ message: "No thought with that id was found!" }))
    .catch(err => res.status(404).json(err))
},
createThought({ body }, res) {
  Thought.create({ thoughtText: body.thoughtText, username: body.username })
    .then(({ _id }) =>
      User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { thoughts: _id } },
        { new: true }
      )
    )
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => res.status(400).json(err));
},
  
  // the updateThought method is used to updated thoughts by id and data is validated
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
    .then(dbThoughtData => dbThoughtData ? res.json(dbThoughtData): res.status(404).json({message: "The thought with this id cannot be found!"}))
    .catch(err => res.status(400).json(err))
  },
  
  // the removeThought method will allow a thought to be removed from a specific user by id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then(dbThoughtData =>  dbThoughtData ? res.json(thought200Message(dbThoughtData._id)) : res.status(404).json({ message: "The thought with this id cannot be found!" }))
    .catch(err => res.status(404).json(err))
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
