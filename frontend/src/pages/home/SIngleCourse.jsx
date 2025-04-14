/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
import RatingModal from "./RatingModal";
import CommentList from "./RatingList";
// import { Chip } from "@mui/material";
import EsewaPayment from "./EsewaPayment";
import Certificate from "./Certificate";
import ChapterCard from "../../components/ChapterCard";
import { Chip } from "@mui/material";

const SingleCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [comment, setComment] = useState(null);
  const [chapterData, setChapterData] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);
  const [totalVideoLength, setTotalVideoLength] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [chapId, setChapId] = useState(null);
  const [videoProgress, setVideoProgress] = useState({});
  const [totalProgress, setTotalProgress] = useState(0);
  const [videoDurations, setVideoDurations] = useState([]);
  const [enrolledId, setEnrolledId] = useState([]);
  const [enrolled, setEnrolled] = useState([]);

  const [student, setStudent] = useState({});

  const getAllData = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.get(baseUrl + "/user/profile", config);
      if (response.status === 200) {
        setStudent(response.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error.response.data);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      const duration = videoRef.current.duration;
      setTotalVideoLength(duration);
    }
  };

  const handlePlay = (chapterId) => {
    setChapId(chapterId);
    const storedProgress = localStorage.getItem(
      `video_progress_${id}_${chapterId}`
    );
    if (storedProgress !== null && videoRef.current) {
      setVideoProgress((prevProgress) => ({
        ...prevProgress,
        [chapterId]: parseFloat(storedProgress),
      }));
      videoRef.current.currentTime = parseFloat(storedProgress);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(baseUrl + "/user/courses/" + id);
      if (response.status === 200) {
        setCourse(response.data);
      }
    } catch (error) {
      console.error("Error fetching course:", error.response?.data);
    }
  }, [id]);

  const fetchDataComment = useCallback(async () => {
    try {
      const response = await axios.get(baseUrl + "/user/get-comment/" + id, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        setComment(response.data);
      }
    } catch (error) {
      // console.error("Error fetching comments:", error.response?.data);
    }
  }, [id]);

  const getAllCourseChapterData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/user/course-chapters/${id}`,
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

  const handleEnroll = async (e) => {
    e.preventDefault();
    if (localStorage.getItem("token")) {
      try {
        const response = await axios.get(baseUrl + "/user/enroll/" + id, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response?.data?.message || "Enrollment failed");
      }
    }
  };

  const getEnroll = useCallback(async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.get(baseUrl + "/user/getId/" + id, config);
      if (response.status === 200) {
        setEnrolledId(response.data.data[0]?.id);
      }
    } catch (error) {
      // console.error("Error fetching enrollment ID:", error.response?.data);
    }
  }, [id]);

  const getAllDataEnroll = useCallback(async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.get(
        baseUrl + "/user/enrolled-course",
        config
      );
      if (response.status === 200) {
        setEnrolled(response.data);
      }
    } catch (error) {
      // console.error("Error fetching enrolled courses:", error.response?.data);
    }
  }, []);

  useEffect(() => {
    fetchData();
    getAllCourseChapterData();
    fetchDataComment();
    getAllDataEnroll();
    getEnroll();
  }, [
    fetchData,
    getAllCourseChapterData,
    fetchDataComment,
    getAllDataEnroll,
    getEnroll,
  ]);

  useEffect(() => {
    const loadedVideoProgress = {};
    chapterData.forEach((chapter) => {
      const storedProgress = localStorage.getItem(
        `video_progress_${id}_${chapter.id}`
      );
      if (storedProgress !== null) {
        loadedVideoProgress[chapter.id] = parseFloat(storedProgress);
      }
    });
    setVideoProgress(loadedVideoProgress);

    const totalWatchedDuration = Object.values(loadedVideoProgress).reduce(
      (acc, progress) => acc + progress,
      0
    );

    const progressPercentage =
      totalWatchedDuration !== 0
        ? (totalWatchedDuration / totalVideoLength) * 100
        : 0;
    setTotalProgress(progressPercentage.toFixed(2));
    localStorage.setItem(
      `video_progress_profile${id}`,
      progressPercentage.toFixed(2)
    );
  }, [chapterData, id, totalVideoLength]);

  useEffect(() => {
    if (chapId) {
      localStorage.setItem(`video_progress_${id}_${chapId}`, currentTime);
    }
  }, [currentTime, id, chapId]);

  useEffect(() => {
    const fetchVideoDurations = async () => {
      try {
        let totalDuration = 0;
        const durations = await Promise.all(
          chapterData.map(async (chapter) => {
            return new Promise((resolve) => {
              const video = document.createElement("video");
              video.src = baseUrl + "/" + chapter.courseVideo;
              video.addEventListener("loadedmetadata", () => {
                const duration = video.duration || 0;
                totalDuration += duration;
                resolve(duration);
              });
              video.addEventListener("error", () => resolve(0));
              video.load();
            });
          })
        );
        setTotalVideoLength(totalDuration);
        setVideoDurations(durations);
      } catch (error) {
        console.error("Error fetching video durations:", error);
      }
    };

    if (chapterData.length > 0) {
      fetchVideoDurations();
    }
  }, [chapterData, id]);

  useEffect(() => {
    getAllData();
  }, []);

  if (!course) {
    return <div className="text-center py-10">Loading course details...</div>;
  }

  const filterEnrolled = enrolled?.enrollments?.filter((c) => {
    return c.courseId === Number(id);
  });

  return (
    <div className="max-w-4xl p-4 lg:p-0 mx-auto mt-10">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 md:pr-4 mb-4">
          {course.courseImage && (
            <img
              src={baseUrl + "/" + course.courseImage}
              alt={course.courseName}
              className="w-full h-auto object-cover rounded-md shadow-lg"
            />
          )}
        </div>
        <div className="w-full md:w-1/2 md:pl-4 mb-4">
          <h2 className="text-3xl font-bold mb-4 capitalize">
            {course.courseName}
          </h2>
          <p className="text-gray-600 mb-4 capitalize">
            {course.courseDescription}
          </p>
          <p className="text-gray-400 font-bold mb-2">
            Price: ${course.coursePrice}
          </p>

          {filterEnrolled?.length > 0 ? (
            filterEnrolled[0].paymentStatus ? (
              <Chip variant="filled" color="success" label="Enrolled" />
            ) : (
              <>
                <EsewaPayment
                  amount={course.coursePrice}
                  user={{
                    name: `${student?.user?.firstName} ${student?.user?.lastName}`,
                    id: student?.userId,
                  }}
                />
              </>
            )
          ) : (
            <button
              onClick={handleEnroll}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Enroll Now
            </button>
          )}
          <p className="mt-2">
            Total Progress: {totalProgress > 100 ? 100 : (totalProgress || 0)}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
        {chapterData.map((chapter, index) => (
          <>
            <ChapterCard
              key={index}
              chapter={chapter}
              index={index}
              filterEnrolled={filterEnrolled}
              handlePlay={handlePlay}
              handleTimeUpdate={handleTimeUpdate}
              videoDurations={videoDurations}
              videoRef={videoRef}
            />
          </>
        ))}
      </div>

      {totalProgress >= 100 && (
        <Certificate
          studentName={`${student?.user?.firstName} ${student?.user?.lastName}`}
          courseName={course?.courseName}
          completionDate={new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        />
      )}

      <button
        onClick={() => setShowModal(!showModal)}
        className="mt-6 px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
      >
        Add Rating
      </button>

      {showModal && (
        <RatingModal
          fetchDataComment={fetchDataComment}
          onClose={() => setShowModal(false)}
        />
      )}
      <CommentList comments={comment} />
    </div>
  );
};

export default SingleCourse;
