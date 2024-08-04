import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuth } from "../../context/Auth/AuthContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [create, setcreate] = useState(false);
  const [newcategory, setnewcategory] = useState("");
  const [Auth] = useAuth();
  const [show, setShow] = useState(false);
  const [updatename, setupdatename] = useState("");
  const [ID, setID] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const categoryList = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/user/categories"
        );
        if (res.data.success) {
          setCategories(res.data.categories);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something wrong");
      }
    };

    categoryList();
  }, [categories]);

  const Add = async () => {
    if (!newcategory.trim()) {
      toast.error("Please enter a valid category", { autoClose: 1200 });
      return;
    }

    try {
      const result = await axios.post(
        "http://localhost:5000/api/admin/addCategory",
        { category: newcategory },
        { headers: { Authorization: `Bearer ${Auth.token}` } }
      );

      if (result.data.success) {
        toast.success("Category created successfully", { autoClose: 1200 });
        setnewcategory("");
      } else {
        toast.error(result.data.message, { autoClose: 1200 });
      }
    } catch (error) {
      // Check if error response exists and is not a network error
      if (error.response) {
        // Server responded with a status code other than 2xx
        toast.error(error.response.data.message || "Something went wrong", {
          autoClose: 1200,
        });
      } else if (error.request) {
        // Request was made but no response received
        toast.error("No response from server", { autoClose: 1200 });
      } else {
        // Something else happened while setting up the request
        toast.error("Error: " + error.message, { autoClose: 1200 });
      }
      console.log(error);
    }
  };

  const handleUpdate = async (req, res) => {
    try {
      const result = await axios.post(
        `http://localhost:5000/api/admin/updateCategory/${ID}`,
        {
          category: updatename,
        },
        { headers: { Authorization: `Bearer ${Auth.token}` } }
      );
      if (result.data.success) {
        toast.success(`${result.data.message}`, { autoClose: 1200 });
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
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary me-5 align-self-end"
          onClick={() => setcreate(true)}
        >
          Create
        </button>
      </div>
      <div className="container" style={{ margin: "20px auto" }}>
        <div className="row mb-5 align-items-center justify-content-center">
          {create && (
            <div className="col-md-8 d-flex align-items-center">
              <input
                className="form-control me-2"
                autoFocus
                value={newcategory}
                onChange={(e) => setnewcategory(e.target.value)}
                type="text"
                placeholder="Enter category"
              />
              <button
                onClick={Add}
                className="btn btn-primary"
                style={{ flexShrink: 0 }}
              >
                Submit
              </button>
            </div>
          )}
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{category.category}</td>
                <td>
                  <Button
                    onClick={() => {
                      handleShow();
                      setupdatename(category.category);
                      setID(category._id);
                    }}
                    className="btn btn-primary"
                  >
                    Edit
                  </Button>
                  <Button className="btn ms-2 btn-danger">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="form-control me-2"
            autoFocus
            value={updatename}
            onChange={(e) => setupdatename(e.target.value)}
            type="text"
            placeholder="Enter category"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleUpdate();
              handleClose();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddCategory;
