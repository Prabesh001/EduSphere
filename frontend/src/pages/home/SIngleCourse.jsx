import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
import RatingModal from "./RatingModal";
import CommentList from "./RatingList";
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
  const [totalVideoLength, setTotalVideoLength] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [chapId, setChapId] = useState(null);
  const [videoProgress, setVideoProgress] = useState({});
  const [totalProgress, setTotalProgress] = useState(0);
  const [videoDurations, setVideoDurations] = useState([]);
  const [enrolledId, setEnrolledId] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [student, setStudent] = useState({});

  const videoRefs = useRef([]);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  const getAllData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(baseUrl + "/user/profile", config);
      if (response.status === 200) {
        setStudent(response.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeUpdate = (index) => {
    const videoElement = videoRefs.current[index]?.current;
    if (videoElement) {
      setCurrentTime(videoElement.currentTime);
      const duration = videoElement.duration;
      setTotalVideoLength(duration);
    }
  };

  const handlePlay = (chapterId, index) => {
    setChapId(chapterId);
    const storedProgress = localStorage.getItem(
      `video_progress_${id}_${chapterId}`
    );
    if (storedProgress !== null && videoRefs.current[index]) {
      setVideoProgress((prevProgress) => ({
        ...prevProgress,
        [chapterId]: parseFloat(storedProgress),
      }));
      videoRefs.current[index].currentTime = parseFloat(storedProgress);
    }
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(baseUrl + "/user/courses/" + id);
      if (response.status === 200) {
        setCourse(response.data);
      }
    } catch (error) {
      console.error("Error fetching course:", error.response?.data);
    } finally {
      setIsLoading(false);
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
      console.error("Error fetching comments:", error.response?.data);
    }
  }, [id]);

  const getAllCourseChapterData = useCallback(async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const handleEnroll = async (e) => {
    e.preventDefault();
    if (localStorage.getItem("token")) {
      setIsLoading(true);
      try {
        const response = await axios.get(baseUrl + "/user/enroll/" + id, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response?.data?.message || "Enrollment failed");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getEnroll = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(baseUrl + "/user/getId/" + id, config);
      if (response.status === 200) {
        setEnrolledId(response.data.data[0]?.id);
      }
    } catch (error) {
      console.error("Error fetching enrollment ID:", error.response?.data);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const getAllDataEnroll = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        baseUrl + "/user/enrolled-course",
        config
      );
      if (response.status === 200) {
        setEnrolled(response.data);
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error.response?.data);
    } finally {
      setIsLoading(false);
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
    getAllData();
  }, []);

  // Update video duration fetching logic
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

  useEffect(() => {
    if (
      chapterData.length > 0 &&
      chapterProgress.length > 0 &&
      videoDurations.length === chapterData.length
    ) {
      let totalPercent = 0;

      chapterData.forEach((chapter, index) => {
        const progressRecord = chapterProgress.find(
          (p) => p.chapter_id === chapter.id
        );
        const watchedSeconds = progressRecord?.progress || 0;
        const videoDuration = videoDurations[index] || 1;
        const percent = Math.min((watchedSeconds / videoDuration) * 100, 100);
        totalPercent += percent;
      });

      const avgPercent = totalPercent / chapterData.length;
      setTotalProgress(avgPercent.toFixed(2));
    }
  }, [chapterProgress, chapterData, videoDurations, totalProgress]);

  if (!course) {
    return <div className="text-center py-10">Loading course details...</div>;
  }

  const filterEnrolled = enrolled?.enrollments?.filter((c) => {
    return c.courseId === Number(id);
  });

  return (
    <div className="max-w-4xl p-4 lg:p-0 mx-auto mt-10">
      {isLoading ? (
        <p className="min-h-[50vh] flex justify-center items-center">
          Loading course...
        </p>
      ) : (
        <>
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
              <p className="text-gray-600 dark:text-gray-300 mb-4 capitalize">
                {course.courseDescription}
              </p>
              <p className="text-gray-400 font-bold mb-2">
                Price: Rs. {course.coursePrice}
              </p>

              {filterEnrolled && filterEnrolled[0] ? (
                <Chip variant="filled" color="success" label="Enrolled" />
              ) : course?.coursePrice > 0 ? (
                <>
                  <EsewaPayment
                    amount={course.coursePrice}
                    user={{
                      name: `${student?.user?.firstName} ${student?.user?.lastName}`,
                      id: student?.userId,
                      endpoint: Number(course?.id),
                      price: course?.coursePrice,
                    }}
                  />
                </>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Enroll Now
                </button>
              )}

              <p className="mt-2">
                Total Progress: {totalProgress > 100 ? 100 : totalProgress || 0}
                %
              </p>
            </div>
          </div>

          <div className="relative my-10">
            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {chapterData.map((chapter, index) => (
                <ChapterCard
                  key={index}
                  chapter={chapter}
                  index={index}
                  filterEnrolled={filterEnrolled}
                  handlePlay={(chapterId) => handlePlay(chapterId, index)}
                  handleTimeUpdate={() => handleTimeUpdate(index)}
                  videoDurations={videoDurations}
                  videoRef={videoRefs.current[index] || React.createRef()} // Use the correct ref for each video
                  chProgress={
                    chapterProgress?.find(
                      (ch) => ch?.chapter_id === chapter?.id
                    )?.progress || 0
                  }
                  config={config}
                  courseId={id}
                />
              ))}
            </div>
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
            className="mt-6 px-6 py-3 mb-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
          >
            Add Rating
          </button>

          {showModal && (
            <RatingModal setShowModal={setShowModal} courseId={id} />
          )}
          <CommentList comments={comment} />
        </>
      )}
    </div>
  );
};

export default SingleCourse;
