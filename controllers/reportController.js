const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");

// A: Product quantities per customer
const getCustomerProductQuantities = async (req, res) => {
  try {
    const customerId = req.params.customerId;

    // Validate customer ID format
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ error: "Invalid customer ID format" });
    }

    const data = await Order.aggregate([
      { $match: { customer: new mongoose.Types.ObjectId(customerId) } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.product",
          totalQuantity: { $sum: "$items.quantity" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: {
          productId: "$product.uuid",
          productName: "$product.name",
          totalQuantity: 1,
        },
      },
    ]);

    res.json(data);
  } catch (err) {
    console.error("Error in getCustomerProductQuantities:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getCustomerProductQuantities };
