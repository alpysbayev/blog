// src/components/CommentForm.js
import React, { useState } from 'react';
import './CommentForm.css';

const CommentForm = ({ postId, onCommentSubmit }) => {
  const [commentContent, setCommentContent] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      content: commentContent,
      post_id: postId,
      author_username: 'adilet', // You can set the default author here or retrieve it dynamically.
    };

    // Call the onCommentSubmit prop to submit the comment to the parent component
    onCommentSubmit(newComment);

    // Clear the comment content after submission
    setCommentContent('');
  };

  return (
    <form className="comment-form-container" onSubmit={handleCommentSubmit}>
      <label className="comment-form-label">
        Comment:
        <textarea
          className="comment-form-textarea"
          name="content"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
      </label>
      <br />
      <button type="submit" className="comment-form-button">
        Submit Comment
      </button>
    </form>
  );
};

export default CommentForm;
