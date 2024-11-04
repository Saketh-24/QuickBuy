import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/Auth/AuthContext";
import { toast } from "react-toastify";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [Auth] = useAuth();

  // State to hold the selected status for each order
  const [selectedStatus, setSelectedStatus] = useState({});

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
        ); // Adjust the API endpoint as needed
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

  // Handle status selection change
  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: newStatus, // Store the selected status for the specific order
    }));
  };

  // Handle the status update
  const updateOrderStatus = async (orderId) => {
    try {
      const updatedStatus = selectedStatus[orderId];
      await axios.put(
        `http://localhost:5000/api/admin/orders/${orderId}/status`, // Adjust API endpoint
        { status: updatedStatus },
        {
          headers: {
            Authorization: `Bearer ${Auth.token}`,
          },
        }
      );
      toast.success("Order status updated successfully!", { autoClose: 1200 });
    } catch (error) {
      console.error("Error updating order status", error);
      alert("Error updating order status");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="flex">{/* <UserMenu /> */}</div>
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) =>
              order.products.map((product, idx) => (
                <tr key={idx}>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>
                    <div className="product-img">
                      <img
                        src={product.product.image}
                        alt=""
                        style={{ width: "50px" }}
                      />
                    </div>
                  </td>
                  <td>{product.product.name}</td>
                  <td>$ {product.price}</td>
                  <td>
                    <input
                      type="text"
                      className="qty-input-box"
                      value={product.qnty}
                      disabled
                    />
                  </td>
                  <td>₹ {product.qnty * product.price}</td>
                  <td>
                    {/* Dropdown to select the order status */}
                    <select
                      value={selectedStatus[order._id] || order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="Not Processed">Not Processed</option>
                      <option value="Processing">Processing</option>
                      <option value="Processed">Processed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    {/* Button to update the order status */}
                    <button
                      className="btn btn-primary"
                      onClick={() => updateOrderStatus(order._id)}
                    >
                      Update
                    </button>
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

export default AdminOrders;
