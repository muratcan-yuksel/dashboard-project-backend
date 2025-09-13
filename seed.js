const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

// Import models
const Customer = require("./models/Customer");
const Product = require("./models/Product");
const Order = require("./models/Order");

// Sample data
const customers = [
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" },
  { name: "Bob Johnson", email: "bob@example.com" },
];

const products = [
  {
    uuid: uuidv4(),
    name: "Laptop",
    price: 999.99,
    stock: 10,
    description: "High performance laptop",
  },
  {
    uuid: uuidv4(),
    name: "Smartphone",
    price: 699.99,
    stock: 20,
    description: "Latest smartphone model",
  },
  {
    uuid: uuidv4(),
    name: "Headphones",
    price: 199.99,
    stock: 30,
    description: "Noise cancelling headphones",
  },
  {
    uuid: uuidv4(),
    name: "Smartwatch",
    price: 249.99,
    stock: 15,
    description: "Fitness and health tracker",
  },
  {
    uuid: uuidv4(),
    name: "Tablet",
    price: 349.99,
    stock: 12,
    description: "10-inch tablet",
  },
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Clear existing data
const clearData = async () => {
  try {
    await Customer.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log("Cleared existing data");
  } catch (error) {
    console.error("Error clearing data:", error);
    process.exit(1);
  }
};

// Seed database
const seedDatabase = async () => {
  try {
    // Insert customers
    const createdCustomers = await Customer.insertMany(customers);
    console.log(`Created ${createdCustomers.length} customers`);

    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log(`Created ${createdProducts.length} products`);

    // Create orders
    const orders = [
      {
        customer: createdCustomers[0]._id,
        items: [
          {
            product: createdProducts[0]._id,
            quantity: 1,
            price: createdProducts[0].price,
          },
          {
            product: createdProducts[1]._id,
            quantity: 2,
            price: createdProducts[1].price,
          },
        ],
        total: createdProducts[0].price + createdProducts[1].price * 2,
      },
      {
        customer: createdCustomers[1]._id,
        items: [
          {
            product: createdProducts[2]._id,
            quantity: 1,
            price: createdProducts[2].price,
          },
          {
            product: createdProducts[3]._id,
            quantity: 1,
            price: createdProducts[3].price,
          },
        ],
        total: createdProducts[2].price + createdProducts[3].price,
      },
      {
        customer: createdCustomers[0]._id,
        items: [
          {
            product: createdProducts[4]._id,
            quantity: 1,
            price: createdProducts[4].price,
          },
          {
            product: createdProducts[1]._id,
            quantity: 1,
            price: createdProducts[1].price,
          },
        ],
        total: createdProducts[4].price + createdProducts[1].price,
      },
    ];

    const createdOrders = await Order.insertMany(orders);
    console.log(`Created ${createdOrders.length} orders`);

    // Update product stock
    for (const order of orders) {
      for (const item of order.items) {
        await Product.updateOne(
          { _id: item.product },
          { $inc: { stock: -item.quantity } }
        );
      }
    }

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seed
(async () => {
  await connectDB();
  await clearData();
  await seedDatabase();
})();
