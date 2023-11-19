import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (formData.username && formData.password) {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/auth/login`, formData)
        .then((res) => {
          if (res.data.accessToken) {
            sessionStorage.token = res.data.accessToken;
            if (res.data.role === "ADMIN") {
              navigate("/dashboard/products");
            } else {
              navigate("/buy-product");
            }
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      alert("Please fill in all the fields.");
    }
  };

  useEffect(() => {
    if (sessionStorage.token) {
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginForm}>
        <h1>Log In</h1>
        <div>
          <input
            type="text"
            placeholder="Type your username..."
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Type your password..."
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div className={styles.loginBtn}>
          <button type="button" onClick={handleSubmit}>
            Log In
          </button>
        </div>
        <div className={styles.signup}>
          Don't have an account?
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
