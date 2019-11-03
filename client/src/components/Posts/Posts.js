import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LoggedContext } from "../../context/LoggedContext";
import "./Posts.css";

const Posts = () => {
  const [posts, setPosts] = useState(null);
  const [logged] = useContext(LoggedContext);

  useEffect(() => {
    get();
  }, []);
  async function get() {
    const response = await fetch(
      "http://localhost/diaryphp/server/api/post/read.php",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "x-authorization": localStorage["token"]
        }
      }
    );
    const data = await response.json();
    setPosts(data.posts);
  }

  const deletePost = async (postId, postAuthorId) => {
    let confirmation = window.confirm("Delete post?");
    if (confirmation) {
      const response = await fetch(
        "http://localhost/diaryphp/server/api/post/delete.php",
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "x-authorization": localStorage["token"]
          },
          body: JSON.stringify({
            postId,
            postAuthorId
          })
        }
      );
      const data = await response.json();
      console.log(data);
      get();
    }
  };

  return logged ? (
    <ul className="posts">
      {posts ? (
        Array.isArray(posts) ? (
          posts.map(post => (
            <li className="post" key={post.id}>
              <div className="title">
                <h1 className="post-title">{post.title}</h1>
                <span
                  className="fa fa-trash-o"
                  onClick={() => deletePost(post.id, post.author_id)}
                />
              </div>
              <small>{post.published_at}</small>
              <p>{post.body}</p>
            </li>
          ))
        ) : (
          <h1>
            No posts!{" "}
            <Link id="to-newpost" to="/newpost">
              Create one?
            </Link>{" "}
          </h1>
        )
      ) : (
        <h1>Fetching posts...</h1>
      )}
    </ul>
  ) : (
    <h1>Login to see posts</h1>
  );
};

export default Posts;
