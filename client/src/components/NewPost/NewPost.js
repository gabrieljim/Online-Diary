import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { LoggedContext } from "../../context/LoggedContext";
import "./NewPost.css";

const NewPost = () => {
  const [created, setCreated] = useState(false);
  const [logged] = useContext(LoggedContext);
  const handleSubmit = async e => {
		try {
			e.preventDefault();

			const response = await fetch(
				"http://localhost/diaryphp/server/api/post/create.php",
				{
					method: "POST",
					body: JSON.stringify({
						title: document.getElementById("title").value,
						body: document.getElementById("body").value
					}),
					headers: {
						Accept: "application/json",
						"x-authorization": localStorage["token"]
					}
				}
			);
			const data = await response.json();
			console.log(data);
			setCreated(true);
		}
		catch(e) {
			console.log(e);
		}
  };
  return logged ? (
    created ? (
      <Redirect to="/posts" />
    ) : (
      <form id="newpost" autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          maxLength="42"
          required
        />
        <textarea
          name="body"
          id="body"
          cols="30"
          rows="10"
          placeholder="Body"
          required
        ></textarea>
        <input id="send-post" type="submit" />
      </form>
    )
  ) : (
    <h1>Login to post</h1>
  );
};

export default NewPost;
