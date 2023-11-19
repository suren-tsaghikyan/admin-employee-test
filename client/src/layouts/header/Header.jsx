import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    navigate("/login");
    sessionStorage.removeItem("token");
  };

  const fetchUserData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/user/me`, {
        headers: { Authorization: `Bearer ${sessionStorage.token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
        } else {
          navigate("/login");
          sessionStorage.removeItem("token");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    if (sessionStorage.token) {
      fetchUserData();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return null;
  }

  return (
    <header>
      <div className="container">
        {user?.role === "ADMIN" ? (
          <ul>
            <li>
              <NavLink
                to="/dashboard/products"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/buyers-history"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Buyers History
              </NavLink>
            </li>
          </ul>
        ) : user?.role === "EMPLOYEE" ? (
          <ul>
            <li>
              <NavLink
                to="/buy-product"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Buy Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/bought-products"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Bought Products
              </NavLink>
            </li>
          </ul>
        ) : null}
        <div className={styles.userInfo}>
          <span>{user?.username}</span>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
