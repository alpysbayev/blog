import React, { useEffect, useState } from "react";
import { getCookie } from "../utils";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const jwt = getCookie("jwt");
        const headers = { Authorization: `Bearer ${jwt}` };

        const response = await fetch(
          "http://localhost:8080/api/users/profile",
          {
            method: "GET",
            headers: headers,
          }
        );

        const profileData = await response.json();
        setUserData(profileData);
        document.cookie = `current_user=${JSON.stringify(profileData)}; path=/`;        
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="profile-container p-4 max-w-md mx-auto bg-lime-100 rounded-md shadow-md my-10">
      <h1 className="text-2xl font-bold mb-4 flex justify-center">
        User Profile
      </h1>
      {userData ? (
        <div className="profile-info flex flex-col space-y-4">
          <label className="flex flex-col">
            <span className="text-sm">Username:</span>
            <span className="font-bold">{userData.username}</span>
          </label>

          <label className="flex flex-col">
            <span className="text-sm">First Name:</span>
            <span className="font-bold">{userData.firstname}</span>
          </label>

          <label className="flex flex-col">
            <span className="text-sm">Last Name:</span>
            <span className="font-bold">{userData.lastname}</span>
          </label>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
