import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";

const DetailsPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/product/${id}`
        );
        if (response.data.success) {
          setProduct(response.data.SingleProduct);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Spinner animation="border" />;

  return (
    <Container className="my-5">
      {product ? (
        <Row>
          <Col md={6} className="d-flex align-items-stretch">
            <Card className="w-100">
              <Card.Img
                variant="top"
                src={`http://localhost:5000/${product.image}`}
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
                <strong>Price:</strong> ${product.price}
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
              <Button disabled={product.quantity <= 0} variant="primary">
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
