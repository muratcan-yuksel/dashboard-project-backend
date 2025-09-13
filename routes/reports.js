const express = require("express");
const router = express.Router();
const {
  getCustomerProductQuantities,
} = require("../controllers/reportController");

// Get product quantities for a specific customer
router.get(
  "/customer/:customerId/product-quantities",
  getCustomerProductQuantities
);

module.exports = router;
