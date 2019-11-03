import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { LoggedContext } from "../../context/LoggedContext";
import "./Navbar.css";

const Navbar = () => {
  const [logged, setLogged] = useContext(LoggedContext);

  const logout = () => {
    localStorage.removeItem("token");
    setLogged(false);
  };

  return (
    <div>
      <nav>
        <ul className="nav-list">
          <Link to="/">
            <h1>Diary</h1>
          </Link>
          <ul className="nav-items">
            <Link to="/users">
              <li className="nav-item">Users</li>
            </Link>
            {logged ? (
              <Fragment>
                <Link to="/newpost">
                  <li className="nav-item">New Post</li>
                </Link>
                <Link to="/posts">
                  <li className="nav-item">Your Posts</li>
                </Link>
                <Link to="/" onClick={logout}>
                  <li className="nav-item">Log out</li>
                </Link>
              </Fragment>
            ) : (
              <Link to="/login">
                <li className="nav-item">Login</li>
              </Link>
            )}
          </ul>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
