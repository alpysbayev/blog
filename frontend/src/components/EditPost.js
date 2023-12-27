// src/components/EditPost.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editData, setEditData] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/posts/${id}`);
        const data = await response.json();
        setEditData({
          title: data.title,
          content: data.content,
        });
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        console.log('Post edited successfully!');
        navigate(`/post/${id}`); // Redirect to the post details page after successful edit
      } else {
        console.error('Failed to edit post');
      }
    } catch (error) {
      console.error('Error during post edit:', error);
    }
  };

  return (
    <div className="edit-post-container p-4 max-w-md mx-auto bg-lime-100 rounded-md shadow-md my-10">
      <h1 className="text-2xl font-bold mb-4 flex justify-center">Edit Post</h1>
      <form onSubmit={handleEdit} className="edit-post-form flex flex-col space-y-4">
        <label className="flex flex-col">
          <span className="text-sm">Title:</span>
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm">Content:</span>
          <textarea
            name="content"
            value={editData.content}
            onChange={handleChange}
            className="border p-2 rounded-md"
            rows="4"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPost;
