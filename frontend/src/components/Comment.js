// src/components/Comment.js
import React from 'react';
import './Comment.css'; // Import the CSS file for styling

const Comment = ({ comment }) => {
  return (
    <div className="comment-container">
      <p className="comment-content">{comment.content}</p>
      <p className="comment-meta">Author: {comment.author_username} - Created At: {comment.created_at}</p>
    </div>
  );
};

export default Comment;
