const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const customerSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
