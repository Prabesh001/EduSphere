import { useEffect, useState } from "react";
import { baseUrl } from "../../../config";
import CourseList from "../../dashboard/home/CourseHomeList";
import axios from "axios";

const HomeTeacherDashboard = () => {
  const [totalCourseCount, setTotalCourseCount] = useState(0);
  const [coursesWithEnrollmentCount, setCoursesWithEnrollmentCount] = useState(
    []
  );

  const getAllDataEnroll = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.get(
        baseUrl + "/teacher/get-dashboard",
        config
      );
      if (response.status === 200) {
        setTotalCourseCount(response.data.totalCourseCount);
        setCoursesWithEnrollmentCount(response.data.coursesWithEnrollmentCount);
      }
    } catch (error) {
      console.error("Error fetching courses:", error.response.data);
    }
  };

  useEffect(() => {
    getAllDataEnroll();
  }, []);

  const totalEnrolls = coursesWithEnrollmentCount.reduce((sum, course) => {
    return sum + course.enrolls.length;
  }, 0);
  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Total Courses Card */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Total Courses</h2>
            <p className="text-3xl font-bold">{totalCourseCount}</p>
          </div>

          {/* Enrollment Count Card */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-2">
              Total Enrollment Count
            </h2>
            <p className="text-3xl font-bold">
              {totalEnrolls}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-lg text-center font-semibold mb-2">
          Individual Course Enrollment Count
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {coursesWithEnrollmentCount.map((course) => (
            <Card key={course.id} course={course} />
          ))}
        </div>
      </div>
      <CourseList />
    </div>
  );
};
const Card = ({ course }) => {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-2 capitalize">{course.courseName}</h2>
      <p className="text-3xl font-bold">{course.enrolls.length}</p>
    </div>
  );
};

export default HomeTeacherDashboard;
