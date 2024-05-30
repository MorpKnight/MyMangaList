import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import axios from "axios";

const DetailsPage = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [details, setDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [userReview, setUserReview] = useState(null);
  const [status, setStatus] = useState("Reading");

  const baseURL = "http://mymangalist.giovan.live";

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
        setReviews(Array.isArray(response.data) ? response.data : []);
        if (user) {
          const userReview = response.data.find(review => review.user_id === user._id);
          if (userReview) {
            setUserReview(userReview);
            setReviewText(userReview.text);
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
      const response = await axios.post(`${baseURL}/detail/add-to-list/${id}`, { status }, { headers: { Authorization: `Bearer ${user.token}` } });
      console.log("Added to list:", response.data);
    } catch (error) {
      console.error("Error adding to list:", error);
    }
  };

  const handleReviewSubmit = async () => {
    try {
      if (userReview) {
        const response = await axios.put(`${baseURL}/detail/review/${id}`, { text: reviewText }, { headers: { Authorization: `Bearer ${user.token}` } });
        setUserReview(response.data);
      } else {
        const response = await axios.post(`${baseURL}/detail/review/${id}`, { text: reviewText }, { headers: { Authorization: `Bearer ${user.token}` } });
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
      await axios.delete(`${baseURL}/detail/review/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
      setReviews(reviews.filter(review => review._id !== userReview._id));
      setUserReview(null);
      setReviewText("");
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  if (!details) {
    return <div>Loading...</div>;
  }

  console.log("Details:", details);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-cover bg-center h-64" style={{ backgroundImage: `url(${details.image_cover})` }}>
        </div>
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-4">{details.title}</h1>
          <p className="text-gray-800 mb-4">{details.description}</p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <p className="text-gray-600 mb-2 md:mb-0"><strong>Author:</strong> {details.author}</p>
            <p className="text-gray-600"><strong>Status:</strong> {details.status}</p>
          </div>
          {user && (
            <button 
              onClick={handleAddToList} 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 mb-4"
            >
              Add to List
            </button>
          )}
          <div>
            <h2 className="text-3xl font-bold mb-4">Reviews</h2>
            {user && userReview && (
              <div className="mb-4 p-4 bg-yellow-100 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold mb-2">Your Review</h3>
                <p className="text-gray-700 mb-4">{userReview.text}</p>
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
                  <p className="text-gray-800">{review.text}</p>
                  <small className="text-gray-600">By: {review.user_id}</small> {/* Ideally, display username */}
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
