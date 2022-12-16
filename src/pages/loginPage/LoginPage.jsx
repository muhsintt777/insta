import { blue, grey } from "@mui/material/colors";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../features/userSlice";
import { auth } from "../../firebase/config";
import "./LoginPage.css";

const LoginPage = () => {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        formEmail,
        formPassword
      );
      dispatch(login(userCred));
      setFormEmail("");
      setFormPassword("");
      navigate("/");
    } catch (err) {
      setError("User not found");
      console.log(err.message);
    }
  };
  return (
    <section style={{ background: grey[100] }} className="loginPage-container">
      <form className="loginPage-form" onSubmit={handleLogin}>
        <div className="loginPage-form__emailDiv">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => {
              setFormEmail(e.target.value);
              if (error) {
                setError(null);
              }
            }}
            value={formEmail}
            placeholder="eg:- johndoe@gmail.com"
            required
            type="email"
            name="email"
          />
        </div>
        <div className="loginPage-form__passwordDiv">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => {
              setFormPassword(e.target.value);
              if (error) {
                setError(null);
              }
            }}
            value={formPassword}
            minLength="8"
            required
            type="password"
            name="password"
          />
        </div>
        <p style={{ color: "red" }}>{error}</p>
        <div className="loginPage-form__buttonDiv">
          <button style={{ background: blue[100] }} type="submit">
            Login
          </button>
        </div>
        <p>
          New ? <Link to="/signup">Create account ?</Link>
        </p>
      </form>
    </section>
  );
};

export default LoginPage;
