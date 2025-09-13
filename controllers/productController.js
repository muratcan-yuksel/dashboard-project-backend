const Product = require("../models/Product");
const { v4: uuidv4 } = require("uuid");

// Create product
const createProduct = async (req, res) => {
  try {
    const product = new Product({
      uuid: uuidv4(),
      ...req.body,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ uuid: req.params.id });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createProduct, getProducts, getProductById };
