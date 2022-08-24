// imports the models
const { User, Thought } = require("../models");

const userController = {
  // the getAllUsers method will get all the users present in the database
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-_v",
      })
      .select("-_v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // the getUserById method will query a user using the user's id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-_v",
      })
      .select("-_v")
      .then((dbUserData) => {
        // when a user is not found by their id
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // the createUser method will create a new user in the database
  createUser({body}, res) {
    User.create(body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(400).json(err));
  },
  // the updateUser method updates a user
  updateUser({params, body}, res) {
    User.findOneAndUpdate({_id: params.id}, body, {new: true})
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({message: "No user found with this ID!"});
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => res.status(400).json(err));
  },
  // the deleteUser method will remove a user from the database
  deleteUser({params}, res) {
    User.findOneAndDelete({_id: params.id})
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({message: "A user with this ID was not found!"});
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => res.status(400).json(err));
  },
};
