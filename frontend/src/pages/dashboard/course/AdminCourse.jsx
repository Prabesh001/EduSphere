import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../config";
import { Link } from "react-router-dom";

const CourseListTableAdmin = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginationNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const getAllData = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.get(baseUrl + "/get-admin-course", config);
      if (response.status === 200) {
        setCourses(response.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error.response.data);
    }
  };

  const onDelete = async (courseId) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.delete(
        baseUrl + `/teacher/delete-admin-course/${courseId}`,
        config
      );
      if (response.status === 200) {
        getAllData(); // Fetch updated data after deletion
      }
    } catch (error) {
      console.error("Error deleting course:", error.response.data);
    }
  };

  const toggleVerification = async (courseId, isVerified) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.patch(
        baseUrl + `/is-verified/${courseId}`,
        { isVerified },
        config
      );
      if (response.status === 200) {
        getAllData(); // Fetch updated data after verification update
      }
    } catch (error) {
      console.error("Error updating verification status:", error.response.data);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

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
          {courses.slice(startIndex, endIndex).map((course) => (
            <tr key={course.id}>
              <td>
                <Link to={`/teacherDashboard/getCourse/${course.id}`}>
                  {course.id}
                </Link>
              </td>
              <td>{course.courseName}</td>
              <td>{course.courseDescription}</td>
              <td>
                <img
                  style={{ height: "100px", width: "100px" }}
                  src={baseUrl + "/" + course.courseImage}
                  alt="Course"
                />
              </td>
              <td>{course.coursePrice}</td>
              <td>
                <input
                  type="checkbox"
                  checked={course.isVerified}
                  onChange={(e) =>
                    toggleVerification(course.id, e.target.checked)
                  }
                />
                {course.isVerified ? "verified" : "unverified"}
              </td>
              <td>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => onDelete(course.id)}
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
    </div>
  );
};

export default CourseListTableAdmin;
