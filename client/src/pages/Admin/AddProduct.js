import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { useAuth } from "../../context/Auth/AuthContext";

const AddProduct = () => {
  const [Categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rating, setRating] = useState("");
  const [photo, setPhoto] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  const [Auth] = useAuth();
  // const [shipping, setShipping] = useState("");

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/categories"
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.log(error);
      }
    };

    getAllCategories();
    // eslint-disable-next-line
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("category", category);
      formData.append("productImage", photo);
      formData.append("rating", rating);
      // formData.append("shipping", shipping);

      const result = await axios.post(
        "http://localhost:5000/api/admin/addProduct", // Replace with your actual endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Auth.token}`,
          },
        }
      );

      if (result.data.success) {
        toast.success(`${result.data.message}`, { autoClose: 1200 });
        setName("");
        setDescription("");
        setCategory("");
        setPhoto("");
        setPrice("");
        setQuantity("");
        setRating("");
      } else {
        toast.error(result.data.message || "Form submission failed", {
          autoClose: 1200,
        });
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong", {
          autoClose: 1200,
        });
      } else if (error.request) {
        toast.error("No response from server", { autoClose: 1200 });
      } else {
        toast.error("Error: " + error.message, { autoClose: 1200 });
      }
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="flex">
          <AdminMenu />
        </div>
      </div>
      <div className="col-md-9 m-auto">
        <h1 className="text-center mb-5">Add New Product</h1>
        <div className="m-1">
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formCategory" className="mb-3">
              <Form.Label className="font-bold">Category</Form.Label>
              <Form.Select
                aria-placeholder="Select category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {Categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPrice" className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formQuantity" className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formAdditionalDetails" className="mb-3">
              <Form.Label>Additional Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter additional details (e.g., weight, dimensions, rating)"
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPhoto" className="mb-3">
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group controlId="formRating" className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product rating (1-5)"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </Form.Group>

            {/* <Form.Group controlId="formShipping" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Shipping"
            checked={shipping}
            onChange={(e) => setShipping(e.target.checked)}
          />
        </Form.Group> */}

            <button className="btn btn-primary w-100 mb-3" type="submit">
              Submit
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
