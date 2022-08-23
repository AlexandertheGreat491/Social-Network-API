// imports the models
const { User, Thought } = require("../models");

const userController = {
    // the getAllUsers method will get all the users present in the database
    getAllUsers(req, res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
}