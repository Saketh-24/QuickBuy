import React, { useEffect, useState } from "react";
// import "./cartstyle.css";
import toast from "react-hot-toast";

const CartDetails = () => {
  // Sample cart data
  const [carts, setCarts] = useState([
    // Example data; replace with your actual cart data
    { id: 1, imgdata: "path/to/image.jpg", dish: "Pizza", price: 200, qnty: 1 },
    {
      id: 2,
      imgdata: "path/to/image.jpg",
      dish: "Burger",
      price: 150,
      qnty: 2,
    },
  ]);

  const [totalPrice, setPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  // Increment quantity
  const handleIncrement = (item) => {
    setCarts(
      carts.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, qnty: cartItem.qnty + 1 }
          : cartItem
      )
    );
  };

  // Decrement quantity or remove item
  const handleDecrement = (id) => {
    setCarts(carts.filter((cartItem) => cartItem.id !== id));
    toast.success("Item Removed From Your Cart");
  };

  // Remove single item
  const handleSingleDecrement = (item) => {
    if (item.qnty <= 1) {
      handleDecrement(item.id);
    } else {
      setCarts(
        carts.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, qnty: cartItem.qnty - 1 }
            : cartItem
        )
      );
    }
  };

  // Empty cart
  const emptyCart = () => {
    setCarts([]);
    toast.success("Your Cart is Empty");
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    const total = carts.reduce((acc, item) => acc + item.price * item.qnty, 0);
    setPrice(total);
  };

  // Calculate total quantity
  const calculateTotalQuantity = () => {
    const total = carts.reduce((acc, item) => acc + item.qnty, 0);
    setTotalQuantity(total);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [carts]);

  useEffect(() => {
    calculateTotalQuantity();
  }, [carts]);

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
                    onClick={emptyCart}
                  >
                    <i className="fa fa-trash-alt mr-2"></i>
                    <span>Empty Cart</span>
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
                        <span id="amount" className="amount">
                          Total Amount
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map((data) => (
                      <tr key={data.id}>
                        <td>
                          <button
                            className="prdct-delete"
                            onClick={() => handleDecrement(data.id)}
                          >
                            <i className="fa fa-trash-alt"></i>
                          </button>
                        </td>
                        <td>
                          <div className="product-img">
                            <img src={data.imgdata} alt="" />
                          </div>
                        </td>
                        <td>
                          <div className="product-name">
                            <p>{data.dish}</p>
                          </div>
                        </td>
                        <td>{data.price}</td>
                        <td>
                          <div className="prdct-qty-container">
                            <button
                              className="prdct-qty-btn"
                              type="button"
                              onClick={() => handleSingleDecrement(data)}
                            >
                              <i className="fa fa-minus"></i>
                            </button>
                            <input
                              type="text"
                              className="qty-input-box"
                              value={data.qnty}
                              disabled
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
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>&nbsp;</th>
                      <th colSpan={3}>&nbsp;</th>
                      <th>
                        Items In Cart <span className="ml-2 mr-2">:</span>
                        <span className="text-danger">{totalQuantity}</span>
                      </th>
                      <th className="text-right">
                        Total Price<span className="ml-2 mr-2">:</span>
                        <span className="text-danger">₹ {totalPrice}</span>
                      </th>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetails;
