const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  uuid: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
