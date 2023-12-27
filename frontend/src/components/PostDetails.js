// src/components/PostDetails.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "./PostDetails.css";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        // Fetch post details
        const response = await fetch(`http://localhost:8080/api/posts/${id}`);
        const postData = await response.json();
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/posts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Post deleted successfully!");
        navigate("/"); // Redirect to the home page after successful deletion
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error during post deletion:", error);
    }
  };

  const handleCommentSubmit = async (newComment) => {
    try {
      const response = await fetch("http://localhost:8080/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        console.log("Comment submitted successfully!");
        // Refresh the post details after successful comment submission
        const updatedResponse = await fetch(
          `http://localhost:8080/api/posts/${id}`
        );
        const updatedPostData = await updatedResponse.json();
        setPost(updatedPostData);
      } else {
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error during comment submission:", error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-details-container">
      <div className="post-details-header">
        <h1>{post.title}</h1>
      </div>
      <div className="post-details-content">
        <p>{post.content}</p>
        <p>Author: {post.author_username}</p>
        <p>Created At: {post.created_at}</p>
      </div>
      <div className="post-details-buttons">
        <Link to={`/edit-post/${id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={handleDelete}>Delete</button>
      </div>

      {/* Display All Comments */}
      <div className="comment-section">
        <h2>All Comments</h2>
        {post.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>

      {/* Comment Form */}
      <div className="comment-section">
        <h2>Add a Comment</h2>
        <CommentForm postId={id} onCommentSubmit={handleCommentSubmit} />
      </div>
    </div>
  );
};

export default PostDetails;
