// imports the express library
const router = require("express").Router();

// imports the methods from the user-controller
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

// user routes
// /api/users
// GET all users and POST to create new users
router.route("/").get(getAllUsers).post(createUser);
