import { useState } from "react";

const EnrolledCourses = ({ courses }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Enrolled Courses</h2>
      {courses?.map((course) => (
        <div
          key={course.id}
          className="flex justify-between items-center border-b py-2"
        >
          <p>{course.course.courseName}</p>
          <p>{course.course.courseDescription}</p>
          <p>{course.course.createdAt}</p>
        </div>
      ))}
    </div>
  );
};

const CompletedCourses = ({ courses }) => {
  // Placeholder data for completed courses
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Completed Courses</h2>
      {courses.map((course) => (
        <div
          key={course.id}
          className="flex justify-between items-center border-b py-2"
        >
          <p>{course.course.courseName}</p>
          <p>{localStorage.getItem(`video_progress_profile${course.course.id}`)}%</p>
        </div>
      ))}
    </div>
  );
};

const CoursesTabs = ({ courses }) => {
  const [activeTab, setActiveTab] = useState("enrolled");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded-lg bg-blue-500 text-white ${
            activeTab === "enrolled" ? " " : "bg-gray-400"
          }`}
          onClick={() => handleTabClick("enrolled")}
        >
          Enrolled Courses
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-white ${
            activeTab === "completed" ? "bg-blue-500 " : "bg-gray-400"
          }`}
          onClick={() => handleTabClick("completed")}
        >
          Completed Courses
        </button>
      </div>
      <div className="mt-8 w-full">
        {activeTab === "enrolled" ? (
          <EnrolledCourses courses={courses} />
        ) : (
          <CompletedCourses courses={courses} />
        )}
      </div>
    </div>
  );
};

export default CoursesTabs;
