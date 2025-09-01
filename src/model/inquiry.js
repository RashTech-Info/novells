const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  name: {
    type: String,
  },
  email: { type: String },
  number: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  address: { type: String },
  description: { type: String },
  status: { type: String, default: "New" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const inquiryModel = mongoose.model("inquiry", inquirySchema);
module.exports = inquiryModel;
