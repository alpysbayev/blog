// src/components/Posts.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="posts-container p-4 mx-auto max-w-2xl">
      <h1 className="text-4xl font-bold mb-4 flex justify-center">All posts</h1>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item bg-lime-100 p-4 rounded-md shadow-md mb-4">
            
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-800 mb-2">{post.content}</p>
            <div className="flex justify-between">
            <p className="text-gray-600 text-xs">Author: {post.author_username}</p>
            <p className="text-gray-600 flex justify-end text-xs">{post.created_at}</p>
            </div>
            <Link to={`/post/${post.id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                View Details
              </button>
            </Link>
          
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
