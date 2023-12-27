// src/components/Navbar.js
import { Link } from "react-router-dom";
import React from "react";
import { getCookie } from "../utils";

const Navbar = () => {
  const handleLogout = () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "current_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("Logout successful!");
    window.location.reload();
  };

  const isJwt = getCookie("jwt") ? true : false;

  console.log("isJwt:", isJwt);

  return (
    <nav className="bg-green-700 p-4 flex justify-between">
      <ul className="flex space-x-4 justify-center">
        <li className="text-white font-bold">
          <Link to="/" className="hover:underline">
            Blog App
          </Link>
        </li>

        <li className="text-white">
          <Link to="/" className="hover:underline">
            Posts
          </Link>
        </li>

        <li className="text-white">
          <Link to="/about" className="hover:underline">
            About
          </Link>
        </li>

        {isJwt ? (
          <li className="text-white">
            <Link to="/create-post" className="hover:underline">
              Create Post
            </Link>
          </li>
        ) : null}
      </ul>

      <ul className="flex space-x-4 justify-end">
        {getCookie("jwt") ? (
          <>
            <li className="text-white">
                <Link to="/profile" className="hover:underline">
                  Profile
                </Link>
            </li>
            <li className="text-white">
              <button onClick={handleLogout}>
                <Link to="/logout" className="hover:underline">
                  Logout
                </Link>
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="text-white">
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </li>
            <li className="text-white">
              <Link
                to="/register"
                className="border border-solid border-white px-4 py-2 rounded hover:bg-white hover:text-green-700"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
