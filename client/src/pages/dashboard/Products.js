import axios from "axios";
import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import styles from "./Products.module.scss";
import EditIcon from "../../components/icons/EditIcon";
import DeleteIcon from "../../components/icons/DeleteIcon";

const Products = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState([]);
  const [showAddProductPopup, setShowAddProductPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [showDeleteProductPopup, setShowDeleteProductPopup] = useState(false);

  const fetchAllProducts = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/product/list`)
      .then((res) => {
        setProducts(res.data.reverse());
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleEditClick = async (product) => {
    setShowAddProductPopup(true);
    setIsEditing(product);
    setFormData({
      name: product.name,
      price: product.price,
    });
  };

  const handleDeleteClick = async (product) => {
    setShowDeleteProductPopup(true);
    setIsDeleting(product);
  };

  const handleAddProductPopupClose = () => {
    setFormData({
      name: "",
      price: "",
    });
    setShowAddProductPopup(false);
    setIsEditing(null);
  };

  const handleDeleteProductPopupClose = () => {
    setShowDeleteProductPopup(false);
    setIsEditing(null);
  };

  const handleSubmit = async () => {
    if (formData.name && formData.price) {
      if (!isEditing) {
        await axios
          .post(`${process.env.REACT_APP_API_URL}/product/create`, formData)
          .then((res) => {
            if (res.status === 200) {
              fetchAllProducts();
              handleAddProductPopupClose();
            } else {
              alert(res.data.message);
            }
          })
          .catch((err) => {
            console.log("err", err);
          });
      } else {
        await axios
          .put(
            `${process.env.REACT_APP_API_URL}/product/update/${isEditing._id}`,
            formData
          )
          .then((res) => {
            if (res.status === 200) {
              fetchAllProducts();
              handleAddProductPopupClose();
            } else {
              alert(res.data.message);
            }
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    } else {
      alert("Please fill in all the fields.");
    }
  };

  const handleConfirmDelete = async () => {
    await axios
      .delete(
        `${process.env.REACT_APP_API_URL}/product/delete/${isDeleting._id}`
      )
      .then((res) => {
        if (res.status === 200) {
          fetchAllProducts();
          handleDeleteProductPopupClose();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className={`container ${styles.productsPage}`}>
      <div className={styles.tableHeader}>
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={() => setShowAddProductPopup(true)}>
          Add product
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product name</th>
            <th>Product price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter((product) =>
              product.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <div className={styles.actions}>
                      <div onClick={() => handleEditClick(product)}>
                        <EditIcon />
                      </div>
                      <div onClick={() => handleDeleteClick(product)}>
                        <DeleteIcon />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Popup open={showAddProductPopup} onClose={handleAddProductPopupClose}>
        <div className={styles.popup}>
          <h1>{isEditing ? "Update a product" : "Add new product"}</h1>
          <div>
            <input
              type="text"
              placeholder="Type product name..."
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Type product price..."
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>
          <div className={styles.popupBtn}>
            <button type="button" onClick={handleSubmit}>
              {isEditing ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </Popup>
      <Popup
        open={showDeleteProductPopup}
        onClose={handleDeleteProductPopupClose}
      >
        <div className={styles.popup}>
          <h1>
            Are you sure you want to delete{" "}
            <strong style={{ color: "red" }}>{isDeleting?.name}</strong>
          </h1>
          <div className={styles.deleteActions}>
            <button
              className={styles.cancelBtn}
              onClick={handleDeleteProductPopupClose}
            >
              Cancel
            </button>
            <button className={styles.deleteBtn} onClick={handleConfirmDelete}>
              Delete
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Products;
