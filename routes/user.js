const express = require("express");

// controller function
const { loginUser, registerUser } = require("../controller/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// register route
router.post("/register", registerUser);

module.exports = router;
