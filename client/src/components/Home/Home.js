import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Diary from "./Diary";
import { LoggedContext } from "../../context/LoggedContext";

const Home = () => {
  const [logged] = useContext(LoggedContext);
  return logged ? (
    <Redirect to="/posts" />
  ) : (
    <div className="home">
      <Diary />
      <div className="info">
        <h1>Your deepest secrets... Can now be shared with everyone!</h1>
        <button>
          <Link to="/register">Get Started</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
