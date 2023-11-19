import React, { useEffect, useState } from "react";
import styles from "./Signup.module.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "ADMIN",
  });

  const handleSubmit = async () => {
    if (formData.username && formData.password && formData.role) {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/user/create`, formData)
        .then((res) => {
          if (res.status === 200) {
            alert("You have successfully registered.");
            navigate("/login");
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
    <div className={styles.signupPage}>
      <div className={styles.signupForm}>
        <h1>Sign Up</h1>
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
        <div className={styles.radio}>
          <label>
            <input
              type="radio"
              value="ADMIN"
              checked={formData.role === "ADMIN"}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            />
            Admin
          </label>
          <label>
            <input
              type="radio"
              value="EMPLOYEE"
              checked={formData.role === "EMPLOYEE"}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            />
            Employee
          </label>
        </div>
        <div className={styles.signupBtn}>
          <button type="button" onClick={handleSubmit}>
            Sign Up
          </button>
        </div>
        <div className={styles.login}>
          Already have an account?
          <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
