const express = require("express");
const {
  deleteUser,
  updateUser,
  findAllUsers,
  createUser,
  getLoggedInUser,
} = require("../controllers/UserController");

const userRouter = express.Router();

// Get logged in user
userRouter.get("/me", getLoggedInUser);

// Create a new user
userRouter.post("/create", createUser);

// Get all users
userRouter.get("/list", findAllUsers);

// Update a user
userRouter.put("/update/:id", updateUser);

// Delete a user
userRouter.delete("/delete/:id", deleteUser);

module.exports = { userRouter };
