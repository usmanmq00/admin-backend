const express = require("express");
const {
  getProducts,
  createProduct,
  //   getProduct,
  //   deleteProduct,
  //   updateProduct,
} = require("../controller/productController");

const adminRequireAuth = require("../middleware/adminRequireAuth");
const upload = require("../middleware/imageUpload");

const router = express.Router();

// GET all products
router.get("/products", getProducts);

// POST a new product
router.post("/products", adminRequireAuth, createProduct);

// File upload endpoint
router.post(
  "/uploadthumbnail",
  adminRequireAuth,
  upload.single("thumbnail"),
  (req, res) => {
    if (!req.file) {
      return res.send("No file uploaded");
    }

    const { filename } = req.file;
    res.status(200).json({ filename });
  }
);

router.post(
  "/uploadmedia",
  adminRequireAuth,
  upload.array("media", 10),
  async (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.send("No file uploaded");
    }

    const imagePaths = req.files.map((file) => file.filename);
    res.status(200).json({ imagePaths });
  }
);
module.exports = router;
