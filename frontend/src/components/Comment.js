// src/components/Comment.js
import React from 'react';

const Comment = ({ comment }) => {
return (
  <div className="bg-lime-100 p-4 rounded-lg shadow-md mb-4 relative">
    <span className='text-xs'>{comment.author_username}</span>
    
    <div className="border-t border-lime-950"></div>
    
    <p className="text-gray-800 mb-2 my-2 text-xl">{comment.content}</p>
    
    <div className="flex items-center justify-end text-gray-600 text-xs">
      <span>{comment.created_at}</span>
    </div>
  </div>
);

};

export default Comment;
