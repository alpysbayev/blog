// src/components/CreatePost.js
import React, { useState } from "react";
import { getCookie } from "../utils";

const CreatePost = () => {
  const [postData, setPostData] = useState({
    title: "",
    content: ""
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
          "Authorization": `Bearer ${getCookie("jwt")}`
        },
        body: JSON.stringify(postData),
      });

      console.log(postData);
      console.log(response);

      if (response.ok) {
        console.log("Post created successfully!");
        window.location.reload();
      } else {
        console.error(response);
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error during post creation:", error);
    }
  };

  return (
    <div className="create-post-container p-4 max-w-md mx-auto bg-lime-100 rounded-md shadow-md my-10">
      <h1 className="text-2xl font-bold mb-4 flex justify-center">Create Post</h1>
      <form onSubmit={handleSubmit} className="create-post-form flex flex-col space-y-4">
        <label className="flex flex-col">
          <span className="text-sm">Title:</span>
          <input
            type="text"
            name="title"
            value={postData.title}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm">Content:</span>
          <textarea
            name="content"
            value={postData.content}
            onChange={handleChange}
            className="border p-2 rounded-md"
            rows="4"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
