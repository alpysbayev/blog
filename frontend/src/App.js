// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Posts from "./components/Posts";
import Register from "./components/Register";
import CreatePost from "./components/CreatePost";
import PostDetails from "./components/PostDetails";
import EditPost from "./components/EditPost";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/edit-post/:id" element={<EditPost />} />{" "}
          {/* Add this route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
