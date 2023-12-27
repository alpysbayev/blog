// src/components/About.js
import React from "react";

const About = () => {
  const authors = [
    { id: 1, name: "Zhakypbekova Dilnaz", role: "Frontend Developer" },
    { id: 2, name: "Bibossyn Gumista", role: "Backend Developer" },
  ];

  return (
    <div className="about-container p-4 mx-auto max-w-2xl">
      <h1 className="text-4xl font-bold mb-4 flex justify-center">About Us</h1>
      <h3 className="text-xl font-bold mb-4 flex justify-center"> Group: IT2-2117</h3>
      <ul className="authors-list">
        {authors.map((author) => (
          <li key={author.id} className="author-item bg-yellow-100 p-4 rounded-md shadow-md mb-4">
            <h2 className="text-xl font-bold mb-2">{author.name}</h2>
            <p className="text-gray-800 mb-2">{author.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default About;
