const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Product",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "Processed",
      enum: [
        "Processed",
        "Not Processed",
        "Processing",
        "Shipped",
        "Delivered",
        "cancel",
      ],
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Orders", OrderSchema);

module.exports = orderModel;
