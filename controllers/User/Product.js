const Orders = require("../../models/OrderModel");
const Product = require("../../models/ProductModel");
const dotenv = require("dotenv");

dotenv.config();

var braintree = require("braintree");

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
    cart.map((item) => {
      total += item.price * item.qnty;
      console.log(item);
    });
    let newTranscation = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new Orders({
            products: cart,
            payment: result,
            buyer: req.user.id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProducts,
  getproductByID,
  TokenController,
  PaymentController,
};
