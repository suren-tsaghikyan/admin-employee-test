import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./BuyersHistory.module.scss";

const BuyersHistory = () => {
  const [boughtProducts, setBoughtProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const fetchAllBoughtProducts = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/product/boughtProductsList`)
      .then((res) => {
        setBoughtProducts(res.data.reverse());
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    fetchAllBoughtProducts();
  }, []);
  return (
    <div className={`container ${styles.buyersHistoryPage}`}>
      <div className={styles.tableHeader}>
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Products</th>
            <th>Total amount $</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {boughtProducts
            .filter(
              (item) =>
                item.user.username
                  .toLowerCase()
                  .includes(searchValue.toLowerCase()) ||
                item.products
                  .map((product) => product.name)
                  .join(",")
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
            )
            .map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.user.username}</td>
                  <td>
                    {item.products.map((product) => product.name).join(",")}
                  </td>
                  <td>{`$${item.total}`}</td>
                  <td>
                    {new Date(item.createdAt)
                      .toLocaleDateString()
                      .replaceAll("/", ".")}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default BuyersHistory;
