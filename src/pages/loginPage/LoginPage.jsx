import { blue, grey } from "@mui/material/colors";
import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
  };
  return (
    <section style={{ background: grey[100] }} className="loginPage-container">
      <form className="loginPage-form" onSubmit={handleLogin}>
        <div className="loginPage-form__emailDiv">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setFormEmail(e.target.value)}
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
            onChange={(e) => setFormPassword(e.target.value)}
            value={formPassword}
            minLength="8"
            required
            type="password"
            name="password"
          />
        </div>
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
