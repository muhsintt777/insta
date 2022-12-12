import { blue, grey } from "@mui/material/colors";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/config";
import "./LoginPage.css";

const LoginPage = () => {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [error, setError] = useState(null);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        formEmail,
        formPassword
      );
      console.log(userCred);
      setFormEmail("");
      setFormPassword("");
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
        <p>{error}</p>
        <div className="loginPage-form__buttonDiv">
          <button style={{ background: blue[100] }} type="submit">
            Login
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
