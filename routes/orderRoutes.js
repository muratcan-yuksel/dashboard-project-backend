const express = require("express");
const router = express.Router();
const { createOrder, getOrders } = require("../controllers/orderController");

// Create a new order
router.post("/", createOrder);

// Get all orders with customer and product details
router.get("/", getOrders);

module.exports = router;
