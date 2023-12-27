// src/components/Posts.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Posts.css'; // Import the CSS file for styling

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="posts-container">
      <h1>Posts</h1>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Author: {post.author_username}</p>
            <p>Created At: {post.created_at}</p>
            <Link to={`/post/${post.id}`}>
              <button className="view-details-btn">View Details</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
