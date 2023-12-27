// src/components/PostDetails.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { getCookie } from "../utils";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const current_user = JSON.parse(getCookie("current_user"));

  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
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
        navigate("/");
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
          Authorization: `Bearer ${getCookie("jwt")}`,
        },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        console.log("Comment submitted successfully!");
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
    <div className="post-details-container p-4 mx-auto max-w-2xl">
      <div className="bg-lime-100 post-details-header mb-4 rounded-lg">
        <h1 className="text-2xl font-bold p-2 flex justify-center ">
          {post.title}
        </h1>
      </div>

      <div className="post-details-content mb-4 rounded-lg shadow-md p-4 bg-lime-200">
        <p className="text-gray-600 flex justify-end">{post.created_at}</p>
        <p>{post.content}</p>
        <p className="text-gray-600">Author: {post.author_username}</p>
      </div>

      {current_user?.username === post.author_username && (
        <div className="post-details-buttons mb-4">
          <Link to={`/edit-post/${id}`}>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">
              Edit
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-700 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      )}

      <div className="comment-section mb-4">
        <h2 className="text-xl font-bold mb-2">Comments</h2>
        {post.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>

      { current_user &&
        <div className="comment-section">
          <CommentForm postId={id} onCommentSubmit={handleCommentSubmit} />
        </div>
      }
    </div>
  );
};

export default PostDetails;
