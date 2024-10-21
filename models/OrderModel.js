const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.ObjectId,
          ref: "Product",
          required: true,
        },
        qnty: {
          type: Number,
          required: true,
          default: 1, // quantity per product
        },
        price: {
          type: Number,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
      },
    ],
    payment: {
      type: Object,
      required: true, // assume you want to store payment info here
    },
    buyer: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "Not Processed",
      enum: [
        "Processed",
        "Not Processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Orders", OrderSchema);

module.exports = orderModel;
