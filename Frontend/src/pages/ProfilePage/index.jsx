import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import defaultProfilePicture from "../../assets/default_propic.jpg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const ProfilePage = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  if (!user) {
    window.location.href = "/login";
  }
  console.log("User:", user);

  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: user.username || "",
    password: "",
    email: user.email || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        password: "",
        email: user.email || "",
      });
    }
  }, [user]);

  const encodeFormData = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const updateProfile = async (data) => {
    try {
      const token = Cookies.get("token"); // Retrieve token from cookies
      console.log("Token:", token);
      const response = await axios.put(
        "http://localhost:5000/profile",
        encodeFormData(data),
        { headers: { cookies: `token=${token}` } }
      );
      console.log(response);
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Failed to update profile:", error);
      return { message: "Failed to update profile" };
    }
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    const response = await updateProfile({ user_id: user.id, ...formData });
    if (response.message.includes("updated successfully")) {
      setUser({
        ...user,
        username: formData.username || user.username,
        email: formData.email || user.email,
      },
    );
      setMessage("Profile updated successfully");
    } else {
      setMessage(response.message);
    }
  };

  const deleteUserHandler = async () => {
    try {
      const token = Cookies.get("token"); // Retrieve token from cookies
      const response = await axios.delete(
        "http://localhost:5000/profile",{},
        { headers: { cookies: `token=${token}` } }
      );
      const result = response.data();
      if (result.message === "User deleted successfully") {
        setUser(null);
        navigate("/login");
      } else {
        setMessage(result.message);
        console.error("Delete failed:", result.message);
      }
    } catch (error) {
      setMessage("Failed to delete user");
      console.error("Failed to delete user:", error);
    }
  };

  const userLists = async () => {
    try {
      const token = Cookies.get("token"); // Retrieve token from cookies
      const response = await axios.get(
        `http://localhost:5000/profile//list`,
        { headers: { cookies: `token=${token}` } }
      );
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Failed to get user lists:", error);
      return { message: "Failed to get user lists" };
    }
  };

  const userReviews = async () => {
    try {
      const token = Cookies.get("token"); // Retrieve token from cookies
      const response = await axios.get(
        `http://localhost:5000/profile/review`,
        { headers: { cookies: `token=${token}` } }
      );
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Failed to get user reviews:", error);
      return { message: "Failed to get user reviews" };
    }
  };
  console.log("User Lists:", userLists());
  console.log("User Reviews:", userReviews());

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center h-screen">
      <div className="bg-white shadow-sm p-4 rounded-md m-3 sm:mt-0 mt-[200px]">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <img
          src={user.profile_picture || defaultProfilePicture}
          alt="Profile Picture"
          className="rounded-full w-32 h-32 object-cover object-center"
        />
        <button
          onClick={deleteUserHandler}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mt-4"
        >
          Delete User
        </button>
      </div>
      <div className="bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <p
          className={
            message && message.includes("User updated")
              ? "text-green-500 mb-4"
              : "text-red-500 mb-4"
          }
        >
          {message}
        </p>
        <form onSubmit={updateProfileHandler} className="mt-2">
          <div className="mb-4">
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your new username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your new password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your new email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-[#C2855F] hover:bg-[#9e6c4e] text-white py-2 px-4 rounded-md mt-2"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
