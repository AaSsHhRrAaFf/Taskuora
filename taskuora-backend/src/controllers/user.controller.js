
const { check, validationResult } = require("express-validator");
const userService = require("../services/user.service");
const validateEmail = require("../utils/email.validator");

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ msg: "Invalid email format" });
  }

  try {
    let user = await userService.findUserByEmail(email);
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = await userService.createUser({ name, email, password });
    const token = userService.generateToken(user);

    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = userService.generateToken(user);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  register,
  login,
};
