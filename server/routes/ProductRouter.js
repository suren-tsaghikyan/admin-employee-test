const express = require("express");
const {
  createProduct,
  findAllProducts,
  updateProduct,
  deleteProduct,
  buyProducts,
  findAllBoughtProducts,
  findBoughtProductsByUserId,
} = require("../controllers/ProductController");

const productRouter = express.Router();

// Create a new product
productRouter.post("/create", createProduct);

// Get all products
productRouter.get("/list", findAllProducts);

// Update a product
productRouter.put("/update/:id", updateProduct);

// Delete a product
productRouter.delete("/delete/:id", deleteProduct);

// Buy products
productRouter.post("/buy", buyProducts);

// Get all bought products
productRouter.get("/boughtProductsList", findAllBoughtProducts);

// Get logged in user's bought products
productRouter.get("/boughtProductsByUserId", findBoughtProductsByUserId);

module.exports = { productRouter };
