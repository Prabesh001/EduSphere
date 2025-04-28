// AddTeacherAdminForm.js

import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddTeacherAdminForm = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };

    try {
      const response = await axios.post(
        baseUrl + "/add-teacher",
        formData,
        config
      );
      if (response.status === 200) {
        nav("/dashboard/teachers");
        toast.success(response.data.message);
      }
      // You can show a success message or redirect the user to another page
    } catch (error) {
      console.error("Error adding teacher:", error.response.data);
      // You can show an error message to the user
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between pt-10">
        <h1 className="text-2xl font-semibold mb-4">Add Teacher Form</h1>

        <Link
          to="/dashboard/teachers"
          className="text-blue-500 hover:underline"
        >
          Teachers List
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 rounded shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Teacher/Admin
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTeacherAdminForm;
