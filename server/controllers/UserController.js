const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getLoggedInUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (decoded) {
      const user = await User.findById(decoded.id);
      if (user) {
        res.status(200).send({ username: user.username, role: user.role });
      } else {
        res.status(401).send({ message: "Unauthorized." });
      }
    } else {
      res.status(401).send({ message: "Unauthorized." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, role } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { username, role },
      { new: true }
    );
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getLoggedInUser,
  findAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
