const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password);
      const accessToken = jwt.sign(
        { id: user._id, username: user.username },
        process.env.TOKEN_SECRET
      );
      if (match) {
        res.send({ accessToken, username: user.username, role: user.role });
      } else {
        res.send({ message: "Password is invalid." });
      }
    } else {
      res.send({ message: "User with this username not found." });
    }
  } catch (e) {
    res.send({ message: e.message });
  }
};

module.exports = { login };
