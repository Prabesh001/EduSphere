import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../config";
import { Link } from "react-router-dom";

const CourseListTable = () => {
  const [teachers, setTeachers] = useState([]);
  const [category, setCategory] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const totalPages = Math.ceil(teachers.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginationNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
    coursePrice: "",
    courseCategoryId: "",
    courseImage: "",
  });

  const getAllData = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.get(baseUrl + "/teacher/get-course", config);
      if (response.status === 200) {
        setTeachers(response.data);
      }
    } catch (error) {
      console.error("Error fetching teachers:", error.response.data);
    }
  };

  const onDelete = async (teacherId) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.delete(
        baseUrl + `/teacher/delete-course/${teacherId}`,
        config
      );
      if (response.status === 200) {
        getAllData(); // Fetch updated data after deletion
      }
    } catch (error) {
      console.error("Error deleting teacher:", error.response.data);
    }
  };

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setFormData({
      courseName: teacher.courseName,
      courseDescription: teacher.courseDescription,
      coursePrice: teacher.coursePrice,
      courseCategoryId: teacher.courseCategoryId,
      courseImage: "",
    });
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedTeacher(null);
    setFormData({
      courseName: "",
      courseDescription: "",
      coursePrice: "",
      courseCategoryId: "",
      courseImage: "",
    });
  };

  const getAllCategoryData = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.get(baseUrl + "/get-all-category", config);
      if (response.status === 200) {
        setCategory(response.data);
      }
    } catch (error) {
      console.error("Error fetching teachers:", error.response.data);
    }
  };

  useEffect(() => {
    getAllData();
    getAllCategoryData();
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
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
      const response = await axios.patch(
        baseUrl + `/teacher/update-course/${selectedTeacher.id}`,
        s,
        config
      );
      if (response.status === 200) {
        setIsUpdateModalOpen(false);
        getAllData();
      }
    } catch (error) {
      console.error("Error updating teacher:", error.response.data);
    }
  };

  return (
    <div className="overflow-x-auto pt-10">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Course Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Verified</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.slice(startIndex, endIndex).map((teacher, i) => (
            <tr key={teacher.id}>
              <td className="text-center text-blue-500">
                <Link to={`/teacherDashboard/getCourse/${teacher.id}`}>
                  {i + 1}.
                </Link>
              </td>
              <td className="capitalize">{teacher.courseName}</td>
              <td>{teacher.courseDescription}</td>
              <td>
                <img
                  style={{ height: "100px", width: "100px" }}
                  src={baseUrl + "/" + teacher.courseImage}
                  alt="Course"
                />
              </td>
              <td>{teacher.coursePrice}</td>
              <td className="capitalize">
                {" "}
                <input type="checkbox" checked={teacher.isVerified} />
                {teacher.isVerified ? "verified" : "unverified"}
              </td>
              <td>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleEdit(teacher)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => onDelete(teacher.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center">
        {paginationNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`mx-2 p-2 border ${
              currentPage === number ? "bg-blue-500 text-white" : ""
            }`}
          >
            {number}
          </button>
        ))}
      </div>
      {/* Update Modal */}
      {selectedTeacher && (
        <div
          className={`fixed z-10 inset-0 overflow-y-auto ${
            isUpdateModalOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form
                encType="multipart/form-data"
                onSubmit={handleFormSubmit}
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
                    onChange={handleFormChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
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
                    onChange={handleFormChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
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
                    onChange={handleFormChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
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
                    onChange={handleFormChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  >
                    <option value="">Select a category...</option>
                    {category.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
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
                    value={formData.courseImage}
                    onChange={handleFormChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Update Teacher
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseUpdateModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseListTable;
