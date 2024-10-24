const Orders = require("../../models/OrderModel");
const Product = require("../../models/ProductModel");
const dotenv = require("dotenv");

dotenv.config();

var braintree = require("braintree");
const User = require("../../models/UserModel");

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(15)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Products fetched successfully",
      productsCount: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong on the server side",
      error,
    });
  }
};

const getproductByID = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.send(400).send({
        success: false,
        message: "id not provided",
      });
    }
    const SingleProduct = await Product.findById(id).populate("category");
    return res.status(200).send({
      success: true,
      message: "Product fetched successfully",
      SingleProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong on the server side",
      error,
    });
  }
};

const TokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const PaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;

    // Calculate total price based on product price and quantity
    cart.forEach((item) => {
      total += item.price * item.qnty;
    });

    // Create a new transaction using the payment gateway
    gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async function (error, result) {
        if (result) {
          // Map cart items to the required format for Orders schema
          const orderProducts = cart.map((item) => ({
            product: item._id, // Assuming _id is the ObjectId of the product
            qnty: item.qnty,
            price: item.price,
            rating: item.rating, // Including rating if necessary
          }));

          // Create and save the order
          const order = new Orders({
            products: orderProducts,
            payment: result, // Save the transaction result
            buyer: req.user.id, // Assuming req.user.id holds the buyer's ID
          });

          await order.save(); // Ensure the order is saved asynchronously

          // Respond with success
          res.json({ ok: true });
        } else {
          // Handle payment error
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getOrders = async (req, res) => {
  try {
    // Find the user based on the ID from the request
    const admin = await User.findById(req.user.id);

    // Check if the user is an admin
    if (admin.role === "admin") {
      // Fetch all orders for admins
      const orders = await Orders.find({}).populate("products.product");
      return res.json(orders);
    }

    // If not an admin, fetch only the orders for the specific buyer
    const orders = await Orders.find({ buyer: req.user.id }).populate(
      "products.product"
    );
    return res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Error fetching orders");
  }
};

module.exports = {
  getProducts,
  getOrders,
  getproductByID,
  TokenController,
  PaymentController,
};
