const express = require("express");
const {
  getCategorys,
  createCategory,
} = require("../controller/categoryController");
const adminRequireAuth = require("../middleware/adminRequireAuth");
const router = express.Router();

// POST a new category
router.post("/categorys", adminRequireAuth, createCategory);

// GET all category
router.get("/categorys", adminRequireAuth, getCategorys);

module.exports = router;
