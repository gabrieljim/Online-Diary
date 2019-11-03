import React, { useEffect, useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { LoggedContext } from "../../context/LoggedContext";
import "./Profile.css";

const Profile = () => {
  const [logged] = useContext(LoggedContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const get = async () => {
      try {
        const response = await fetch(
          "http://localhost/diaryphp/server/api/user/profile.php",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "x-authorization": localStorage["token"]
            }
          }
        );
        const data = await response.json();
        setProfile(data);
      } catch (e) {
        console.log(e);
      }
    };
    get();
  }, []);

  return logged ? (
    profile ? (
      <div id="profile-container">
        <h1>Welcome {profile.username}!</h1>
        <h3>Your email: {profile.email}</h3>
        <h4>
          <Link to="/newpost">Create a new post?</Link>
        </h4>
      </div>
    ) : (
      <h1>Fetching profile...</h1>
    )
  ) : (
    <Redirect to="/" />
  );
};

export default Profile;
