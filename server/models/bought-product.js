const mongoose = require("mongoose");

const boughtProductSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  total: Number,
  createdAt: Date,
});

const BoughtProduct = mongoose.model("BoughtProduct", boughtProductSchema);

module.exports = BoughtProduct;
