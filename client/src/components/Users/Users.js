import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const get = async () => {
      const response = await fetch(
        "http://localhost/diaryphp/server/api/user/profiles.php",
        {
          method: "GET"
        }
      );
      const data = await response.json();
      setUsers(data.users);
      console.log(data);
    };
    get();
  }, []);

  return (
    <div id="users-container">
      {users ? (
        <Fragment>
          <h1 className="users-title">Users</h1>
          <ul id="users-list">
            {users.map(user => (
              <li className="user" key={user.id}>
                <Link to={`/users/${user.id}`}>
                  <h1>{user.username}</h1>
                </Link>
              </li>
            ))}
          </ul>
        </Fragment>
      ) : (
        <h1>Fetching users...</h1>
      )}
    </div>
  );
};

export default Users;
