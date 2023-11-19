import React, { useEffect, useState } from "react";
import styles from "./BuyProduct.module.scss";
import axios from "axios";
import Product from "../../components/product/Product";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ShoppingCart from "../../components/shoppingCart/ShoppingCart";

const BuyProduct = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (item) => {
    const index = products.findIndex((e) => e.name === item.name);
    const updatedCart = [...products];
    updatedCart.splice(index, 1);
    setProducts(updatedCart);
    addToCart(item);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, product) => total + product.price, 0);
  };

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

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className={`container ${styles.buyProductPage}`}>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.grid}>
          <div className={styles.draggableElement}>
            {products.map((product) => (
              <Product key={product._id} {...product} />
            ))}
          </div>
          <div className={styles.droppableElement}>
            <ShoppingCart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              calculateTotal={calculateTotal}
            />
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default BuyProduct;
