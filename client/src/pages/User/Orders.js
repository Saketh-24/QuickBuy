import { useEffect, useState } from "react";
import axios from "axios";
import UserMenu from "../../components/UserMenu";
import { useAuth } from "../../context/Auth/AuthContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [Auth, setAuth] = useAuth();

  useEffect(() => {
    // Fetch the placed orders
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/user/orders",
          {
            headers: {
              Authorization: `Bearer ${Auth.token}`, // Include token in headers
            },
          }
        );
        console.log(data);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    fetchOrders();
  }, [Auth.token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats the date to "MM/DD/YYYY"
  };

  // Function to determine text color based on order status
  const getStatusClass = (status) => {
    switch (status) {
      case "Processed":
        return "text-success"; // Green
      case "Not Processed":
        return "text-danger"; // Red
      case "Processing":
        return "text-warning"; // Yellow/Orange
      case "Shipped":
        return "text-primary"; // Blue
      case "Delivered":
        return "text-info"; // Light blue
      case "Cancelled":
        return "text-secondary"; // Grey
      default:
        return "text-dark"; // Default Black
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="flex">
          <UserMenu />
        </div>
      </div>
      <div className="orders-table">
        <table className="table cart-table mb-0 table-responsive-sm">
          <thead>
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) =>
              order.products.map((product, idx) => (
                <tr key={idx}>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>
                    <div className="product-img">
                      <img src={product.product.image} alt="" />
                    </div>
                  </td>
                  <td>
                    <div className="product-name">{product.product.name}</div>
                  </td>
                  <td>{product.price}</td>
                  <td>
                    <div className="prdct-qty-container">
                      <input
                        type="text"
                        className="qty-input-box"
                        value={product.qnty}
                        disabled
                      />
                    </div>
                  </td>
                  <td className="text-right">
                    $ {product.qnty * product.price}
                  </td>
                  <td className={`text-right ${getStatusClass(order.status)}`}>
                    {order.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
