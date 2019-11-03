import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { RegisteredContext } from "../../context/RegisteredContext";
import Registering from "./Registering/Registering";
import "./Register.css";

const Register = () => {
  const [submitted, setSubmitted] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [redirectFromRegister, setRedirectFromRegister] = useContext(
    RegisteredContext
  );

  const handleSubmit = async e => {
    console.log(redirectFromRegister);
    e.preventDefault();

    setRegistering(true);

    await fetch("http://localhost/diaryphp/server/api/user/register.php", {
      method: "POST",
      body: JSON.stringify({
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      })
    });

    setRedirectFromRegister(true);
    setRegistering(false);
    setSubmitted(true);
  };

  return submitted ? (
    <Redirect to="/login" />
  ) : (
    <div className="register-container">
      {registering ? <Registering /> : null}
      <h1>Register</h1>
      <form id="register-form" autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          required
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
        />
        <input type="submit" />
      </form>
      <p id="register-prompt">
        Already got an account?{" "}
        <Link id="register-link" to="/login">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Register;
