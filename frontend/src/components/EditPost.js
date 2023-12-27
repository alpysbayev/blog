// src/components/EditPost.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditPost.css';

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
    <div className="edit-post-container">
      <h1>Edit Post</h1>
      <form className="edit-post-form" onSubmit={handleEdit}>
        <label>
          Title:
          <input type="text" name="title" value={editData.title} onChange={handleChange} />
        </label>
        <br />
        <label>
          Content:
          <textarea name="content" value={editData.content} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPost;
