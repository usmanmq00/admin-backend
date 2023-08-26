const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productsSchema = new Schema(
  {
    thumbnail: {
      type: String,
      // required: true,
    },
    media: {
      type: [String],
      // required: true,
    },
    productName: {
      type: String,
      // required: true,
    },
    sku: {
      type: String,
      // required: true,
    },
    stock: {
      type: Number,
      // required: true,
    },
    basePrice: {
      type: Number,
      // required: true,
    },
    categories: {
      type: [String],
      // required: true,
    },
    tags: {
      type: [String],
      // required: true,
    },
    // date: {
    //   type: String,
    // required: true,
    // },
    status: {
      type: String,
      // required: true,
    },

    productDescription: {
      type: String,
      // required: true,
    },
    shippingReturns: {
      type: String,
      // required: true,
    },
    careInstructions: {
      type: String,
      // required: true,
    },

    discountType: {
      type: String,
      // required: true,
    },
    discount: {
      type: Number,
      // required: true,
    },

    barcode: {
      type: String,
      // required: true,
    },

    backorders: {
      type: Boolean,
      // required: true,
    },
    metaTagTitle: {
      type: String,
      // required: true,
    },
    metaTagDescription: {
      type: String,
      // required: true,
    },
    metaTagKeywords: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", productsSchema);
