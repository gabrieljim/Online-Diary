import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { LoggedProvider } from "./context/LoggedContext";
import { RegisteredProvider } from "./context/RegisteredContext";
import Navbar from "./components/Navbar/Navbar";
import NewPost from "./components/NewPost/NewPost";
import Posts from "./components/Posts/Posts";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import Users from "./components/Users/Users";
import User from "./components/User/User";

function App() {
  return (
    <div className="App">
      <LoggedProvider>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/newpost" component={NewPost} />
              <Route path="/posts" component={Posts} />
              <Route path="/profile" component={Profile} />
              <Route exact path="/users" component={Users} />
              <Route path="/users/:id" component={User} />
              <RegisteredProvider>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
              </RegisteredProvider>
            </Switch>
          </div>
        </Router>
      </LoggedProvider>
    </div>
  );
}

export default App;
