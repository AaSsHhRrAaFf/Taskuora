
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const User = require("../models/user.model");

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
  ],
  userController.register
);

router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  userController.login
);

/* router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}); */

router.get("/me", auth, async (req, res) => {
  try {
    //console.log("User ID from token:", req.user); // Debug user ID
    const user = await User.findById(req.user).select("-password");
    if (!user) {
      console.log("User not found"); // Debug user not found
      return res.status(404).json({ msg: "User not found" });
    }
    //console.log("User found:", user); // Debug user found
    res.json(user);
  } catch (err) {
    console.error("Server error:", err.message); // Debug server error
    res.status(500).send("Server Error");
  }
});



module.exports = router;
