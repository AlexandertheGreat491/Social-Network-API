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

// /api/users/:id
// route will get, updated, delete users by their id

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
