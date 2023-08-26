const Product = require("../models/productModels");

// get all Products
const getProducts = async (req, res) => {
  const Products = await Product.find({}).sort({ createdAt: -1 });

  res.status(200).json(Products);
};

// create a new product
const createProduct = async (req, res) => {
  const {
    status,
    categories,
    tags,
    productName,
    productDescription,
    shippingReturns,
    careInstructions,
    media,
    basePrice,
    discountType,
    discount,
    sku,
    barcode,
    stock,
    backorders,
    metaTagTitle,
    metaTagDescription,
    metaTagKeywords,
    thumbnail,
    // date,
  } = req.body;

  let emptyFields = [];

  if (!productName) {
    emptyFields.push("Product Name");
  }
  // if (!thumbnail) {
  //   emptyFields.push("thumbnail");
  // }
  // if (media.length === 0) {
  //   emptyFields.push("media");
  // }
  // if (!sku) {
  //   emptyFields.push("sku");
  // }
  // if (!stock) {
  //   emptyFields.push("stock");
  // }
  // if (!basePrice) {
  //   emptyFields.push("price");
  // }
  // if (!categories) {
  //   emptyFields.push("categories");
  // }
  // if (!tags) {
  //   emptyFields.push("tag");
  // }
  // if (!date) {
  //   emptyFields.push("date");
  // }
  // if (!productDescription) {
  //   emptyFields.push("Product Description");
  // }
  // if (!shippingReturns) {
  //   emptyFields.push("Shipping and Returns");
  // }
  // if (!careInstructions) {
  //   emptyFields.push("Care Instructions");
  // }
  // if (!discountType) {
  //   emptyFields.push("Discount Type");
  // }
  // if (!discount) {
  //   emptyFields.push("discount");
  // }
  // if (!barcode) {
  //   emptyFields.push("barcode");
  // }
  // if (!backorders) {
  //   emptyFields.push("back orders");
  // }
  // if (!metaTagTitle) {
  //   emptyFields.push("Meta Tag Title");
  // }
  // if (!metaTagDescription) {
  //   emptyFields.push("Meta Tag Description");
  // }
  // if (!metaTagKeywords) {
  //   emptyFields.push("Meta Tag Keywords");
  // }
  // if (!status) {
  //   emptyFields.push("status");
  // }

  if (emptyFields.length > 0) {
    return res.send(`Please fill in all fields. ${emptyFields} is empty`);
  }

  // add to the database
  try {
    const product = await Product.create({
      thumbnail,
      status,
      categories,
      tags,
      productName,
      productDescription,
      shippingReturns,
      careInstructions,
      media,
      basePrice,
      discountType,
      discount,
      sku,
      barcode,
      stock,
      backorders,
      metaTagTitle,
      metaTagDescription,
      metaTagKeywords,
      // date,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  createProduct,
};
