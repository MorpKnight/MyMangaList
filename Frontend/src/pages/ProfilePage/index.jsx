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
  const [userLists, setUserLists] = useState([]);
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

  useEffect(() => {
    const fetchUserLists = async () => {
      try {
        const token = Cookies.get("token"); // Retrieve token from cookies
        const response = await axios.get(`https://mymangalist.giovan.live/profile/list`, {
          headers: { cookies: `token=${token}` },
        });
        console.log("Response data.data:", response.data.data);
        setUserLists(response.data.data);
        console.log("User lists:", userLists);
      } catch (error) {
        console.error("Failed to get user lists:", error);
      }
    };

    fetchUserLists();
  }, []);

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
        "https://mymangalist.giovan.live/profile",
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
      });
      setMessage("Profile updated successfully");
    } else {
      setMessage(response.message);
    }
  };

  const deleteUserHandler = async () => {
    try {
      const token = Cookies.get("token"); // Retrieve token from cookies
      const response = await axios.delete(
        "https://mymangalist.giovan.live/profile", {},
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-start h-screen bg-gray-100 pt-[80px]">
      <div className="bg-white shadow-sm p-4 rounded-md m-3 sm:mt-0 mt-[120px] w-full sm:w-1/3">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <img
          src={user.profile_picture || defaultProfilePicture}
          alt="Profile Picture"
          className="rounded-full w-32 h-32 object-cover object-center mt-4 mb-4"
        />
        <button
          onClick={deleteUserHandler}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mt-4 w-full"
        >
          Delete User
        </button>
      </div>
      <div className="bg-white p-8 shadow-md rounded-md m-3 w-full sm:w-2/3">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <p
          className={
            message && message.includes("Profile updated")
              ? "text-green-500 mb-4"
              : "text-red-500 mb-4"
          }
        >
          {message}
        </p>
        <form onSubmit={updateProfileHandler} className="mt-2">
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
            className="bg-[#C2855F] hover:bg-[#9e6c4e] text-white py-2 px-4 rounded-md mt-2 w-full"
          >
            Save Changes
          </button>
        </form>
      </div>
      <div className="bg-white p-8 shadow-md rounded-md m-3 w-full sm:w-2/3">
        <h2 className="text-2xl font-bold mb-4">User Lists and Reviews</h2>
        {userLists.length > 0 ? (
          userLists.map((list) => (
            <div key={list._id} className="border-b border-gray-200 pb-4 mb-4">
              <p><strong>Media Title:</strong> {list.media_id.title}</p>
              <p><strong>Review Text:</strong> {list.review_text || 'No review provided'}</p>
              <p><strong>Status:</strong> {list.status}</p>
              <p><strong>Created At:</strong> {new Date(list.created_at).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {new Date(list.updated_at).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No user lists found</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
