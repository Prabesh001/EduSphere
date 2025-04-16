import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { baseUrl } from "../../../config";

const CourseList = () => {
  const [teachers, setTeachers] = useState([]);

  const search = useLocation();
  const getAllData = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.get(
        baseUrl +
          (search.pathname === "/dashboard"
            ? "/teacher/get-admin-course"
            : "/teacher/get-course"),
        config
      );
      if (response.status === 200) {
        setTeachers(response.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error.response.data);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const isVerifiedCount = teachers.filter((row) => row.isVerified);
  const isUnVerifiedCount = teachers.filter((row) => !row.isVerified);

  const renderCourseCards = () => {
    return teachers.map((course) => (
      <div
        key={course.id}
        className="max-w-full rounded overflow-hidden shadow-2xl "
      >
        <Link to={"/course/" + course.id}>
          {/* Course Image */}
          <img
            className=" h-[300px] w-full object-cover"
            src={baseUrl + "/" + course.courseImage}
            alt="Course"
          />

          {/* Course Details */}
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 capitalize">
              {course.courseName}
            </div>
            <p className="text-gray-700 text-base">
              {course.courseDescription}
            </p>
          </div>

          {/* Price */}
          <div className="px-6 py-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              Price: ${course.coursePrice}
            </span>
          </div>
        </Link>
      </div>
    ));
  };

  return (
    <div>
      <div className="flex w-full gap-5 pt-10">
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Verfied Course Count</h2>
          <p className="text-3xl font-bold">{isVerifiedCount.length}</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold mb-2">UnVerfied Course Count</h2>
          <p className="text-3xl font-bold">{isUnVerifiedCount.length}</p>
        </div>
      </div>
      <h1 className="text-center font-bold my-8 text-5xl">Latest Courses</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {renderCourseCards()}
      </div>
    </div>
  );
};

export default CourseList;
