import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeToCart,
  removeSingleItems,
  emptycartIteam,
  setCart,
} from "../redux/CartSlice";
import { toast } from "react-toastify";
import { useAuth } from "../context/Auth/AuthContext";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const CartDetails = () => {
  const { carts } = useSelector((state) => state.allCart);
  // eslint-disable-next-line
  const [Auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [totalprice, setPrice] = useState(0);
  const [totalquantity, setTotalQuantity] = useState(0);
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(Auth);
    // Load cart from localStorage on component mount
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      dispatch(setCart(storedCart)); // Assuming you have a setCart action to set the initial cart state
    }
  }, [dispatch]);

  useEffect(() => {
    // Update localStorage whenever cart changes
    localStorage.setItem("cart", JSON.stringify(carts));
  }, [carts]);

  // Add to cart
  const handleIncrement = (e) => {
    dispatch(addToCart(e));
  };

  // Remove from cart (completely delete)
  const handleDecrement = (itemId) => {
    dispatch(removeToCart(itemId)); // This deletes the item
    toast.success("Item Removed From Your Cart", {
      autoClose: 1200, // Duration in milliseconds
    });
  };

  // Remove single item (decrement quantity)
  const handleSingleDecrement = (itemId) => {
    if (itemId) {
      dispatch(removeSingleItems(itemId)); // Pass the ID to the Redux action
    } else {
      console.error("Invalid item ID"); // Debugging line
    }
  };

  // Empty cart
  const emptycart = () => {
    dispatch(emptycartIteam());
    localStorage.removeItem("cart"); // Clear local storage
    toast.success("Your Cart is Empty", { autoClose: 1200 });
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      let totalprice = 0;
      carts.forEach((item) => {
        totalprice += item.price * item.qnty;
      });
      setPrice(totalprice);
    };

    calculateTotalPrice();
  }, [carts]);

  useEffect(() => {
    const calculateTotalQuantity = () => {
      let totalquantity = 0;
      carts.forEach((item) => {
        totalquantity += item.qnty;
      });
      setTotalQuantity(totalquantity);
    };

    calculateTotalQuantity();
  }, [carts]);

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/user/payment/token"
      );
      console.log(data);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [Auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:5000/api/user/proceed/payment",
        {
          nonce,
          cart: carts,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.token}`, // Include token in headers
          },
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      emptycart();
      navigate("/dashboard/User/Orders");
      toast.success("Payment Completed Successfully", {
        autoClose: 1200, // Duration in milliseconds
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="row justify-content-center m-0">
        <div className="col-md-8 mt-5 mb-5 cardsdetails">
          <div className="card">
            <div className="card-header bg-dark p-3">
              <div className="card-header-flex">
                <h5 className="text-white m-0">
                  Cart Calculation {carts.length > 0 ? `(${carts.length})` : ""}
                </h5>
                {carts.length > 0 ? (
                  <button
                    className="btn btn-danger mt-0 btn-sm"
                    onClick={emptycart}
                  >
                    <i className="fa fa-trash-alt mr-2"></i>
                    <span>EmptyCart</span>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="card-body p-0">
              {carts.length === 0 ? (
                <table className="table cart-table mb-0">
                  <tbody>
                    <tr>
                      <td colSpan={6}>
                        <div className="cart-empty">
                          <i className="fa fa-shopping-cart"></i>
                          <p>Your Cart Is Empty</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="table cart-table mb-0 table-responsive-sm">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th className="text-right">
                        {" "}
                        <span id="amount" className="amount">
                          Total Amount
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <button
                              className="prdct-delete"
                              onClick={() => handleDecrement(data._id)}
                            >
                              <i className="fa fa-trash-alt"></i>
                            </button>
                          </td>
                          <td>
                            <div className="product-img">
                              <img src={data.image} alt="" />
                            </div>
                          </td>
                          <td>
                            <div className="product-name">{data.name}</div>
                          </td>
                          <td>{data.price}</td>
                          <td>
                            <div className="prdct-qty-container">
                              <button
                                className="prdct-qty-btn"
                                type="button"
                                onClick={() => handleSingleDecrement(data._id)} // Pass the item's ID
                              >
                                <i className="fa fa-minus"></i>
                              </button>

                              <input
                                type="text"
                                className="qty-input-box"
                                value={data.qnty}
                                disabled
                                name=""
                                id=""
                              />
                              <button
                                className="prdct-qty-btn"
                                type="button"
                                onClick={() => handleIncrement(data)}
                              >
                                <i className="fa fa-plus"></i>
                              </button>
                            </div>
                          </td>
                          <td className="text-right">
                            ₹ {data.qnty * data.price}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>&nbsp;</th>
                      <th colSpan={3}>&nbsp;</th>
                      <th>
                        Items In Cart <span className="ml-2 mr-2">:</span>
                        <span className="text-danger">{totalquantity}</span>
                      </th>
                      <th className="text-right">
                        Total Price<span className="ml-2 mr-2">:</span>
                        <span className="text-danger">₹ {totalprice}</span>
                      </th>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          </div>
          {Auth?.user?.address ? (
            <div className="mt-5 d-flex justify-content-center align-items-center">
              <div
                className="mt-5 d-flex flex-column justify-content-center align-items-center p-4 shadow-lg bg-light rounded"
                style={{
                  maxWidth: "500px",
                  height: "250px",
                  margin: "0 auto",
                }}
              >
                <h4 className="text-primary mb-3">Current Address</h4>
                <h5 className="text-muted mb-4">
                  {Auth?.user?.address || "No address available"}
                </h5>
                <button
                  className="btn btn-warning btn-lg"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
              {totalquantity > 0 && (
                <div
                  className="mt-3 d-flex flex-column justify-content-center align-items-center"
                  style={{
                    maxWidth: "500px",
                    height: "250px",
                    margin: "0 auto",
                  }}
                >
                  {!clientToken ? (
                    <>
                      {console.log("Client Token:", clientToken)}
                      {console.log("Cart Length:", totalquantity)}
                      {console.log("Auth Address:", Auth?.user?.address)}
                    </>
                  ) : (
                    <div
                      className="mt-5 d-flex flex-column justify-content-center align-items-center p-4 rounded"
                      style={{
                        maxWidth: "500px",
                        height: "250px",
                        margin: "0 auto",
                      }}
                    >
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />
                      <button
                        className="mt-2 btn btn-primary"
                        onClick={handlePayment}
                        disabled={loading || !instance || !Auth?.user?.address}
                      >
                        {loading ? "Processing ...." : "Make Payment"}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="mt-3 d-flex justify-content-center align-items-center">
              {Auth?.token ? (
                <button
                  className="btn btn-warning"
                  onClick={() => navigate("/dashboard/User/Profile")}
                >
                  Update Address
                </button>
              ) : (
                <button
                  className="btn btn-warning"
                  onClick={() =>
                    navigate("/login", {
                      state: "/cart",
                    })
                  }
                >
                  Please Login to checkout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDetails;
