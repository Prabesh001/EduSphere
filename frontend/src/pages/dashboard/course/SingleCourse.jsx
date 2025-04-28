import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../config";
import { useParams } from "react-router-dom";
import EnrollmentTable from "./Enrollements";
import { toast } from "react-toastify";

const SingleCoursePage = () => {
  const [chapterData, setChapterData] = useState([]);
  const [course, setCourse] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newChapterData, setNewChapterData] = useState({
    chapterTitle: "",
    chapterDescription: "",
    courseVideo: "",
    chapterStatus: "published",
    chapterType: "free",
  });

  const { id } = useParams();

  const getAllCategoryData = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}/teacher/get-course/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        setCourse(response.data);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  }, [id]);

  const getAllCourseChapterData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/teacher/get-course-chapters/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        setChapterData(response.data);
      }
    } catch (error) {
      console.error("Error fetching course chapters:", error);
    }
  }, [id]);

  const [enroll, setEnroll] = useState([]);
  const getAllCourseChapterDatas = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}/course-enroll/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        setEnroll(response.data.enrollments);
      }
    } catch (error) {
      console.error("Error fetching course chapters:", error);
    }
  }, [id]);

  useEffect(() => {
    getAllCategoryData();
    getAllCourseChapterData();
    getAllCourseChapterDatas();
  }, [
    getAllCategoryData,
    getAllCourseChapterData,
    id,
    getAllCourseChapterDatas,
  ]);

  const handleChange = (e) => {
    setNewChapterData({
      ...newChapterData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChapterSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await axios.post(
        `${baseUrl}/teacher/add-chapter/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        toast.success("Chapter added successfully");
        setNewChapterData({
          chapterTitle: "",
          chapterDescription: "",
          courseVideo: "",
          chapterStatus: "published",
          chapterType: "free",
        });
        setShowModal(false);
        getAllCourseChapterData();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error adding chapter!");
      console.error("Error adding chapter:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        {course.courseName}
      </h2>
      <p className="text-lg text-gray-800 text-center mb-8">
        {course.courseDescription}
      </p>
      <h1>Enrollment Details</h1>
      <EnrollmentTable enrollments={enroll} />
      <div className="flex justify-center mb-8">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowModal(true)}
        >
          Add Chapter
        </button>
      </div>

      {showModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="relative bg-white rounded-lg p-8 max-w-md mx-auto">
            <form onSubmit={handleChapterSubmit}>
              <h2 className="text-xl font-bold mb-4">Add Chapter</h2>
              <div className="mb-4">
                <input
                  type="text"
                  name="chapterTitle"
                  placeholder="Chapter Title"
                  onChange={handleChange}
                  value={newChapterData.chapterTitle}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="chapterDescription"
                  placeholder="Chapter Description"
                  onChange={handleChange}
                  value={newChapterData.chapterDescription}
                  className="w-full p-2 border border-gray-300 rounded-md"
                ></textarea>
              </div>
              <div className="mb-4">
                <input
                  type="file"
                  name="courseVideo"
                  placeholder="Course Video URL"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <select
                  name="chapterStatus"
                  onChange={handleChange}
                  value={newChapterData.chapterStatus}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="published">Published</option>
                  <option value="unpublished">Unpublished</option>
                </select>
              </div>
              <div className="mb-4">
                <select
                  name="chapterType"
                  onChange={handleChange}
                  value={newChapterData.chapterType}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Add Chapter
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Close Modal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {chapterData.map((chapter) => (
          <div key={chapter.id} className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold text-xl mb-2">{chapter.chapterTitle}</h3>
            <p className="text-gray-800 mb-4">{chapter.chapterDescription}</p>
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <video
                src={baseUrl + "/" + chapter.courseVideo}
                controls
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <p>Status: {chapter.chapterStatus}</p>
            <p>Type: {chapter.chapterType}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleCoursePage;
