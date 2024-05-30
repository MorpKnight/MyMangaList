import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Cookies from "js-cookie";
import axios from "axios";

const DetailsPage = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [details, setDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [userReview, setUserReview] = useState(null);
  const [status, setStatus] = useState("Reading");
  const [score, setScore] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const baseURL = "http://localhost:5000";

  const statusOptions = ['Reading', 'Completed', 'On-Hold', 'Dropped', 'Plan to Read'];

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}/detail/${id}`);
        console.log("Details Response:", response.data);
        setDetails(response.data.data); // Access the data field here
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${baseURL}/detail/review/${id}`);
        console.log("Reviews Response:", response.data);
        setReviews(Array.isArray(response.data.data) ? response.data.data : []);
        
        if (user) {
          const userReview = response.data.data.find(review => review.user_id._id === user.id);
          if (userReview) {
            setUserReview(userReview);
            setReviewText(userReview.review_text); // Use review_text instead of text
          }
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      }
    };

    fetchDetails();
    fetchReviews();
  }, [id, user]);

  const handleAddToList = async () => {
    try {
      const token = Cookies.get("token"); // Retrieve token from cookies
      
      // Validate score
      if (score && (score < 1 || score > 10)) {
        setErrorMessage("Score must be between 1 and 10.");
        return;
      }

      const data = { status, score, start_date: startDate, end_date: endDate };
      const response = await axios.post(`${baseURL}/detail/add-to-list/${id}`, data, { headers: { cookies: `token=${token}` } });
      console.log("Added to list:", response.data);
    } catch (error) {
      console.error("Error adding to list:", error);
    }
  };

  const handleReviewSubmit = async () => {
    try {
      const token = Cookies.get("token"); // Retrieve token from cookies
      if (userReview) {
        const response = await axios.put(`${baseURL}/detail/review/${id}`, { review_text: reviewText }, { headers: { cookies: `token=${token}` } });
        setUserReview(response.data);
        setReviews(reviews.map(review => (review._id === response.data._id ? response.data : review)));
      } else {
        const response = await axios.post(`${baseURL}/detail/review/${id}`, { review_text: reviewText }, { headers: { cookies: `token=${token}` } });
        setReviews([...reviews, response.data]);
        setUserReview(response.data);
      }
      setReviewText("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleReviewDelete = async () => {
    try {
      const token = Cookies.get("token"); // Retrieve token from cookies
      await axios.delete(`${baseURL}/detail/review/${userReview._id}`, { headers: { cookies: `token=${token}` } });
      setReviews(reviews.filter(review => review._id !== userReview._id));
      setUserReview(null);
      setReviewText("");
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  if (!details) {
    return <div className="flex items-center justify-center min-h-screen"><div className="text-2xl">Loading...</div></div>;
  }

  console.log("Details:", details);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-cover bg-center h-64" style={{ backgroundImage: `url(${details.image_cover})` }}></div>
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-4">{details.title}</h1>
          <div className="flex flex-wrap mb-4">
            {details.genre.map((genre) => (
              <span key={genre} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full mr-2 mb-2">
                {genre}
              </span>
            ))}
          </div>
          <div className="flex flex-col mb-4">
            <p className="text-gray-600 mb-2"><strong>Author:</strong> {details.author}</p>
            <p className="text-gray-600 mb-2"><strong>Status:</strong> {details.status}</p>
            {details.release_date && (
              <p className="text-gray-600 mb-2"><strong>Release date:</strong> {new Date(details.release_date).toLocaleDateString()}</p>
            )}
            <p className="text-gray-600 mb-2"><strong>Score:</strong> {details.score}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg mb-4">
            <p className="text-gray-800">{details.description}</p>
          </div>
          {user && (
            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select 
                id="status" 
                value={status} 
                onChange={(e) => setStatus(e.target.value)} 
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              >
                {statusOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <label htmlFor="score" className="block text-sm font-medium text-gray-700 mb-2 mt-4">Score</label>
              <input
                type="number"
                id="score"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                min="1"
                max="10"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Optional"
              />
              {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
              <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-2 mt-4">Start Date</label>
              <input
                type="date"
                id="start_date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Optional"
              />
              <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-2 mt-4">End Date</label>
              <input
                type="date"
                id="end_date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Optional"
              />
              <button 
                onClick={handleAddToList} 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 mt-4"
              >
                Add to List
              </button>
            </div>
          )}
          <div>
            <h2 className="text-3xl font-bold mb-4">Reviews</h2>
            {user && userReview && (
              <div className="mb-4 p-4 bg-yellow-100 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold mb-2">Your Review</h3>
                <p className="text-gray-700 mb-4">{userReview.review_text}</p>
                <textarea 
                  value={reviewText} 
                  onChange={(e) => setReviewText(e.target.value)} 
                  className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                  placeholder="Edit your review..."
                />
                <div className="flex space-x-4">
                  <button 
                    onClick={handleReviewSubmit} 
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    Update Review
                  </button>
                  <button 
                    onClick={handleReviewDelete} 
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Delete Review
                  </button>
                </div>
              </div>
            )}
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm">
                  <p className="text-gray-800">{review.review_text}</p>
                  <small className="text-gray-600">By: {review.user_id && review.user_id.username ? review.user_id.username : "Unknown User"}</small>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No reviews yet</p>
            )}
            {user && !userReview && (
              <div>
                <textarea 
                  value={reviewText} 
                  onChange={(e) => setReviewText(e.target.value)} 
                  className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                  placeholder="Write your review here..."
                />
                <button 
                  onClick={handleReviewSubmit} 
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Submit Review
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
