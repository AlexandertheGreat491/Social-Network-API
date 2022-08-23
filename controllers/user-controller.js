// imports the models
const { User } = require("../models");


const userController = {
  // the getAllUsers method will get all the users present in the database
  getAllUsers(req, res) {
    User.find({})
    .populate({
        path: "thoughts",
        select: "-_v",
    })
    .select("-_v")
    .sort({_id: -1})
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    })
  },
};
