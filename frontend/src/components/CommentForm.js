// src/components/CommentForm.js
import React, { useState } from 'react';

const CommentForm = ({ postId, onCommentSubmit }) => {
  const [commentContent, setCommentContent] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      content: commentContent,
      post_id: postId
    };

    // Call the onCommentSubmit prop to submit the comment to the parent component
    onCommentSubmit(newComment);

    // Clear the comment content after submission
    setCommentContent('');
  };

  return (
    <form className="comment-form-container p-4" onSubmit={handleCommentSubmit}>
      <label className="block text-gray-800 font-semibold mb-2">
        Comment:
        <textarea
          className="comment-form-textarea border border-gray-300 p-2 w-full rounded-md"
          name="content"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          rows="4"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
      >
        Submit Comment
      </button>
    </form>
  );
};

export default CommentForm;
