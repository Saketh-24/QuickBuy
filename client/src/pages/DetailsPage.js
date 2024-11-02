import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import { toast } from "react-toastify";

const DetailsPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/product/${id}`
        );
        if (response.data.success) {
          setProduct(response.data.SingleProduct);
        } else {
          toast.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if the product is already in the cart
      const productExists = storedCart.find((item) => item._id === product._id);

      let updatedCart;

      if (productExists) {
        // If the product is already in the cart, increase the quantity
        updatedCart = storedCart.map((item) =>
          item._id === product._id ? { ...item, qnty: item.qnty + 1 } : item
        );
      } else {
        // If it's a new product, add it to the cart
        updatedCart = [...storedCart, { ...product, qnty: 1 }];
      }

      // Dispatch to Redux store
      dispatch(addToCart(updatedCart));

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      toast.success("Item added to your cart", { autoClose: 1200 });
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <Container className="my-5">
      {product ? (
        <Row>
          <Col md={6} className="d-flex align-items-stretch">
            <Card style={{ width: "100%", border: "none" }}>
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                className="card-img-cover"
              />
            </Card>
          </Col>
          <Col md={6} className="d-flex align-items-stretch">
            <Card className="p-4 w-100">
              <Card.Title>{product.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {product.category.name}
              </Card.Subtitle>
              <Card.Text>
                <strong>Description:</strong> {product.description}
              </Card.Text>
              <Card.Text>
                <strong>Price:</strong> ₹{product.price}
              </Card.Text>
              <Card.Text>
                <strong>Quantity:</strong>{" "}
                {product.quantity > 0 ? (
                  <span className="text-success">In Stock</span>
                ) : (
                  <span className="text-danger">Out of Stock</span>
                )}
              </Card.Text>
              <Card.Text>
                <strong>Weight:</strong> {product.weight} grams
              </Card.Text>
              <Card.Text>
                <strong>Rating:</strong>
                <div className="mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`star ${i < product.rating ? "filled" : ""}`}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
              </Card.Text>
              <Button
                disabled={product.quantity <= 0}
                variant="primary"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </Card>
          </Col>
        </Row>
      ) : (
        <div>Product not found</div>
      )}
    </Container>
  );
};

export default DetailsPage;
