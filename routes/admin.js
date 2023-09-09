const express = require("express");

// controller function
const { loginAdmin, registerAdmin } = require("../controller/adminController");

const router = express.Router();

// login route
router.post("/login", loginAdmin);
router.post("/registerAdmin", registerAdmin);

module.exports = router;