import React from "react";
import { useDrop } from "react-dnd";
import styles from "./ShoppingCart.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShoppingCart = ({ cartItems, removeFromCart, calculateTotal }) => {
  const navigate = useNavigate();
  const [{ isOver }, drop] = useDrop({
    accept: "PRODUCT",
    drop: (item) => removeFromCart(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleBuyClick = async () => {
    const productIds = cartItems.map((product) => product._id);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/product/buy`,
        { productIds },
        {
          headers: { Authorization: `Bearer ${sessionStorage.token}` },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Successfully bought.");
          navigate("/bought-products");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className={styles.shoppingCart} ref={drop}>
      {cartItems.length ? (
        <div>
          {cartItems.map((item, index) => (
            <div
              key={index}
              style={{
                marginBottom: "8px",
                border: "1px solid black",
                borderRadius: "10px",
                padding: "5px",
              }}
            >
              {item.name} ${item.price}{" "}
            </div>
          ))}
        </div>
      ) : null}
      {isOver && (
        <div style={{ height: "30px", backgroundColor: "yellow" }}>
          Drop here!
        </div>
      )}
      {cartItems.length ? (
        <div className={styles.totalSection}>
          <div className={styles.total}>
            <span>Total</span>
            <p>${calculateTotal()}</p>
          </div>
          <button onClick={handleBuyClick}>Buy</button>
        </div>
      ) : null}
    </div>
  );
};

export default ShoppingCart;
