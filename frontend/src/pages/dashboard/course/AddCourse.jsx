import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddCourseForm = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
    coursePrice: "",
    courseCategoryId: "",
    courseImage: "",
  });
  const [teachers, setTeachers] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.courseName.trim()) {
      errors.courseName = "Course name is required";
    }
    if (!formData.courseDescription.trim()) {
      errors.courseDescription = "Course description is required";
    }
    if (!formData.coursePrice.trim()) {
      errors.coursePrice = "Course price is required";
    } else if (isNaN(formData.coursePrice)) {
      errors.coursePrice = "Course price must be a number";
    }
    if (!formData.courseCategoryId) {
      errors.courseCategoryId = "Please select a category";
    }
    if (!formData.courseImage) {
      errors.courseImage = "Please select an image";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, proceed with submission
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      };
      const data = new FormData(e.target);
      let s = {
        ...formData,
        courseImage: data.get("courseImage"),
      };
      try {
        const response = await axios.post(
          baseUrl + "/teacher/add-course",
          s,
          config
        );

        if (response.status === 200) {
          toast.success("success", response.data.message);
          nav("/teacherDashboard/getCourse");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error adding course!");
        console.error("Error adding course:", error.response);
        // You can show an error message to the user
      }
    }
  };

  const getAllData = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.get(baseUrl + "/get-all-category", config);
      if (response.status === 200) {
        setTeachers(response.data);
      }
    } catch (error) {
      console.error("Error fetching teachers:", error.response.data);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className="container mx-auto mt-12">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold mb-4">Add Course Form</h1>
        <Link
          to="/teacherDashboard/getCourse"
          className="text-blue-500 hover:underline"
        >
          View All Courses
        </Link>
      </div>
      <div className="grid grid-cols-2">
        <div>
          <img
            src="https://img.freepik.com/free-vector/course-enrollment-abstract-concept-illustration-enroll-course-apply-degree-program-add-study-plan-online-enrollment-system-registration-form-new-student_335657-3491.jpg"
            alt=""
          />
        </div>
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white p-8 rounded shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="courseName"
              className="block text-sm font-medium text-gray-700"
            >
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className={`mt-1 p-2 border rounded-md w-full ${
                errors.courseName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.courseName && (
              <p className="text-red-500 text-xs mt-1">{errors.courseName}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="courseDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Course Description
            </label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              value={formData.courseDescription}
              onChange={handleChange}
              className={`mt-1 p-2 border rounded-md w-full ${
                errors.courseDescription ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.courseDescription && (
              <p className="text-red-500 text-xs mt-1">
                {errors.courseDescription}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="coursePrice"
              className="block text-sm font-medium text-gray-700"
            >
              Course Price
            </label>
            <input
              type="text"
              id="coursePrice"
              name="coursePrice"
              value={formData.coursePrice}
              onChange={handleChange}
              className={`mt-1 p-2 border rounded-md w-full ${
                errors.coursePrice ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.coursePrice && (
              <p className="text-red-500 text-xs mt-1">{errors.coursePrice}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="courseCategoryId"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="courseCategoryId"
              name="courseCategoryId"
              value={formData.courseCategoryId}
              onChange={handleChange}
              className={`mt-1 p-2 border rounded-md w-full ${
                errors.courseCategoryId ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a category...</option>
              {teachers.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            {errors.courseCategoryId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.courseCategoryId}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="courseImage"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              type="file"
              id="courseImage"
              name="courseImage"
              onChange={handleChange}
              className={`mt-1 p-2 border rounded-md w-full ${
                errors.courseImage ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.courseImage && (
              <p className="text-red-500 text-xs mt-1">{errors.courseImage}</p>
            )}
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseForm;
