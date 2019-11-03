import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { RegisteredContext } from "../../context/RegisteredContext";
import { LoggedContext } from "../../context/LoggedContext";
import "./Login.css";

const Login = () => {
  const [logged, setLogged] = useContext(LoggedContext);
  const [failed, setFailed] = useState(null);
  const [redirectFromRegister, setRedirectFromRegister] = useContext(
    RegisteredContext
  );

  useEffect(() => {
    if (redirectFromRegister) {
      setTimeout(() => {
        setRedirectFromRegister(false);
      }, 2000);
    }
    if (failed) {
      setTimeout(() => {
        setFailed(null);
      }, 2000);
    }
  }, [redirectFromRegister, setRedirectFromRegister, failed, setFailed]);

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost/diaryphp/server/api/user/login.php",
      {
        method: "POST",
        body: JSON.stringify({
          username: document.getElementById("username_login").value,
          password: document.getElementById("password_login").value
        })
      }
    );
    const data = await response.json();
    //If login was succesful store the token on localStorage
    if (data.jwt) {
      localStorage.setItem("token", data.jwt);
      setLogged(true);
    } else {
      setFailed(data.message);
    }
  };

  return logged ? (
    <Redirect to="/profile" />
  ) : (
    <div className="login-container">
      <h1>Login</h1>
      {redirectFromRegister ? (
        <p
          className="correct flash-message"
          onClick={() => setRedirectFromRegister(false)}
        >
          Succesfully registered!
        </p>
      ) : null}
      {failed ? (
        <p className="error flash-message" onClick={() => setFailed(null)}>
          {failed}
        </p>
      ) : null}
      <form id="login-form" autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          id="username_login"
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          id="password_login"
          placeholder="Password"
          required
        />
        <input type="submit" />
      </form>
      <p id="register-prompt">
        Don't have an account?{" "}
        <Link id="register-link" to="/register">
          Make one!
        </Link>
      </p>
    </div>
  );
};

export default Login;
