// RatingModal.js

import { useState } from "react";
import { baseUrl } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const RatingModal = ({ onClose, fetchDataComment }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();

  const handleSubmit = async (e) => {
    let data = {
      rating: rating,
      comment: comment,
    };
    e.preventDefault();
    const response = await axios.post(
      baseUrl + "/user/add-comment/" + id,
      data,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (response.status === 200) {
      toast("success", response.data.message);
      fetchDataComment();
    }
    onClose(); // Close the modal after submission
  };

  // Function to handle star click
  const handleStarClick = (value) => {
    setRating(value);
  };

  // Function to generate stars
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-3xl cursor-pointer ${
            i <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
          onClick={() => handleStarClick(i)}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    // <Modal onClose={onClose}>
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Rate this chapter</h2>
      <div className="flex mb-4">{renderStars()}</div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          className="border border-gray-300 rounded-md p-2 mb-2 w-full"
          rows="4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
    // </Modal>
  );
};

export default RatingModal;
