import { useEffect, useState } from "react";
import { baseUrl, config } from "../../../config";
import axios from "axios";

const EnrolledCourses = ({ courses }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Enrolled Courses</h2>
      <table className="min-w-full table-auto border">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="border px-4 py-2 text-left">Course Name</th>
            <th className="border px-4 py-2 text-left">Description</th>
            <th className="border px-4 py-2 text-left">Enrolled Date</th>
          </tr>
        </thead>
        <tbody>
          {courses?.map((course) => (
            <tr key={course.id} className="border-t">
              <td className="border px-4 py-2 capitalize">
                {course.course?.courseName}
              </td>
              <td className="border px-4 py-2">
                {course.course?.courseDescription}
              </td>
              <td className="border px-4 py-2">
                {new Date(course.course?.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CompletedCourses = ({ courses }) => {
  const [chapterProgress, setChapterProgress] = useState([]);

  useEffect(() => {
    const getChapterProgress = async () => {
      try {
        const res = await axios.get(`${baseUrl}/progress/course`, config);
        const result = res.data;
        setChapterProgress(result);
      } catch (error) {
        console.log(error);
      }
    };
    getChapterProgress();
  }, []);

  console.log("ch", chapterProgress);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Courses Completions</h2>
      <table className="min-w-full border border-gray-300 text-left">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-2 border">Course ID</th>
            <th className="px-4 py-2 border">Course Name</th>
            <th className="px-4 py-2 border">Chapter Progress</th>
          </tr>
        </thead>
        {/* <p>
            {localStorage.getItem(`video_progress_profile${course.course.id}`)}%
          </p> */}
        <tbody>
          {courses?.map((course) => (
            <tr key={course.id} className="border-t">
              <td className="px-4 py-2 border">{course.course.id}</td>
              <td className="px-4 py-2 border capitalize">
                {course.course.courseName}
              </td>
              <td className="px-4 py-2 border">
                {chapterProgress
                  .filter((progress) => progress.course_id === course.course.id)
                  .map((progress) => (
                    <p key={progress.chapter_id}>
                      Chapter {progress.chapter_id}:{" "}
                      {!progress.video_durations
                        ? `${progress.progress.toFixed(2)}s `
                        : `${
                            (
                              progress.progress.toFixed(2) /
                              (progress.video_durations || 1)
                            ).toFixed(2) * 100
                          }%`}
                    </p>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
          Courses Completions
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
