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
    Thought.findOne({ _id: params.id }).then((dbThoughtData) => {
      // if a thought with a certain id is not found
      if (!dbThoughtData) {
        res
          .status(404)
          .json({
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
};
