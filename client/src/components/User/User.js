import React, { Fragment, useState, useEffect } from "react";
import "./User.css";

const User = props => {
  const [id] = useState(props.match.params.id);
  const [posts, setPosts] = useState(null);
  const [username, setUsername] = useState(null);
  const [fetching, setFetching] = useState(null);

  useEffect(() => {
    const get = async () => {
      const response = await fetch(
        "http://localhost/diaryphp/server/api/post/foreignpost.php",
        {
          method: "POST",
          body: JSON.stringify({
            id
          })
        }
      );
      const data = await response.json();
      setUsername(data.username);
      setPosts(Array.isArray(data.posts) ? data.posts : null);
      setFetching(false);
    };
    setFetching(true);
    get();
  }, [id, setFetching]);
  return (
    <div className="foreign-posts">
      {fetching ? (
        <h1>Fetching...</h1>
      ) : posts ? (
        <Fragment>
          <h1>{username}'s posts:</h1>
          <ul className="foreign-list">
            {posts.map(post => (
              <li key={post.id} className="foreign-post">
                <h1>{post.title}</h1>
                <small>{post.published_at}</small>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        </Fragment>
      ) : (
        <h1>{username} hasn't made a post yet</h1>
      )}
    </div>
  );
};

export default User;
