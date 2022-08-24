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
}