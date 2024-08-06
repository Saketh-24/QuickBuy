import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/Auth/AuthContext";

const HomePage = () => {
  const [Auth] = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/products",
          {
            headers: { Authorization: `Bearer ${Auth.token}` },
          }
        );
        if (response.data.success) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [Auth.token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center m-3">Products</h1>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="card">
                {product.image && (
                  <img
                    src={`http://localhost:5000/${product.image.replace(
                      "\\",
                      "/"
                    )}`}
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p
                    className="card-text text-truncate"
                    style={{ overflow: "hidden" }}
                  >
                    {product.description}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="card-text mb-0">
                      <strong>Price:</strong> ${product.price}
                    </p>
                    <p
                      className={`card-text mb-0 ${
                        product.quantity > 0 ? "text-success" : "text-danger"
                      }`}
                    >
                      <strong>Quantity: </strong>
                      {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                  <button className="btn btn-primary w-100 mt-3">View</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
