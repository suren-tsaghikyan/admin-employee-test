const Product = require("../models/product");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const BoughtProduct = require("../models/bought-product");

const findAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  const { name, price } = req.body;

  try {
    const product = new Product({ name, price: Number(price) });
    await product.save();
    res.send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, price: Number(price) },
      { new: true }
    );
    res.send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    res.send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const buyProducts = async (req, res) => {
  try {
    const { productIds } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (decoded) {
      const user = await User.findById(decoded.id);
      if (user && user.role === "EMPLOYEE") {
        if (productIds && productIds.length) {
          const products = await Product.find({ _id: { $in: productIds } });
          const sum = products.reduce((accumulator, object) => {
            return accumulator + object.price;
          }, 0);
          const boughtProduct = new BoughtProduct({
            user: user._id,
            products: productIds,
            total: sum,
            createdAt: new Date(),
          });
          await boughtProduct.save();
          res.send(boughtProduct);
        } else {
          res.send({ message: "Products are required." });
        }
      } else {
        res.send({ message: "You are not an Employee." });
      }
    } else {
      res.status(401).send({ message: "Unauthorized." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findAllBoughtProducts = async (req, res) => {
  try {
    const boughtProducts = await BoughtProduct.find({})
      .populate("user")
      .populate("products");
    res.send(boughtProducts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findBoughtProductsByUserId = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (decoded) {
      const boughtProducts = await BoughtProduct.find({ user: decoded.id })
        .populate("user")
        .populate("products");
      res.send(boughtProducts);
    } else {
      res.status(401).send({ message: "Unauthorized." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  findAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  buyProducts,
  findAllBoughtProducts,
  findBoughtProductsByUserId,
};
