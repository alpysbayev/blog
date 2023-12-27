// src/components/CreatePost.js
import React, { useState } from "react";
import "./CreatePost.css";

const CreatePost = () => {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    author_username: "adilet", // You can set the default author here or retrieve it dynamically.
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        console.log("Post created successfully!");
        // Optionally, you can redirect the user or perform other actions after successful post creation.
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error during post creation:", error);
    }
  };

  return (
    <div className="create-post-container">
      <h1>Create Post</h1>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={postData.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Content:
          <textarea
            name="content"
            value={postData.content}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
