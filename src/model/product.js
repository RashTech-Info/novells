const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  category: { type: String },
  price: {
    type: Number,
  },
  features: [String],
  skuCode: { type: String },
  productImage: { type: String },
  productGalleryImage: { type: [String] },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
