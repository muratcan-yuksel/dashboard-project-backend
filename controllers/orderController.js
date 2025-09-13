const Order = require("../models/Order");
const Product = require("../models/Product");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { customer, items } = req.body;

    // Validate input
    if (!customer || !items || !items.length) {
      return res.status(400).send("Customer and items are required");
    }

    // Get products and validate stock
    const productIds = items.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    // Check if all products exist and have sufficient stock
    for (const item of items) {
      const product = products.find((p) => p._id.toString() === item.product);
      if (!product) {
        return res.status(400).send(`Product ${item.product} not found`);
      }
      if (product.stock < item.quantity) {
        return res
          .status(400)
          .send(`Insufficient stock for product ${product.name}`);
      }
    }

    // Calculate total and prepare items with price snapshots
    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const product = products.find((p) => p._id.toString() === item.product);
      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      // Update product stock
      await Product.updateOne(
        { _id: product._id, stock: { $gte: item.quantity } },
        { $inc: { stock: -item.quantity } }
      );
    }

    // Create order
    const order = new Order({
      customer,
      items: orderItems,
      total,
    });

    await order.save();

    // Populate the response with customer and product details
    const populatedOrder = await Order.findById(order._id)
      .populate("customer", "name email")
      .populate("items.product", "name price");

    res.status(201).json(populatedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Error creating order");
  }
};

// Get all orders with customer and product details
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name email")
      .populate("items.product", "name price")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Error fetching orders");
  }
};
