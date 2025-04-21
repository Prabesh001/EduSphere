import { useEffect, useRef } from "react";
import { baseUrl } from "../config";
import { syncProgress } from "../hook/useVideoProgressSync";

const ChapterCard = ({
  chapter,
  videoRef,
  filterEnrolled,
  handleTimeUpdate,
  handlePlay,
  videoDurations,
  index,
  chProgress,
  courseId,
  token,
}) => {
  console.log(chapter);
  const intervalRef = useRef(null);
  const isEnrolled = filterEnrolled?.length > 0;

  const startSync = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        syncProgress({
          videoRef,
          chapterId: chapter?.id,
          courseId,
          token,
          videoDurations: videoDurations[index],
        });
      }, 10000);
    }
  };

  const stopSync = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    const handlePauseOrEnd = () => {
      syncProgress({
        videoRef,
        chapterId: chapter.id,
        courseId,
        token,
        videoDurations: videoDurations[index],
      });
      stopSync();
    };

    const video = videoRef.current;

    if (video) {
      video.addEventListener("pause", handlePauseOrEnd);
      video.addEventListener("ended", handlePauseOrEnd);
    }

    return () => {
      if (video) {
        video.removeEventListener("pause", handlePauseOrEnd);
        video.removeEventListener("ended", handlePauseOrEnd);
      }
      stopSync();
    };
  }, [videoRef, chapter.id, courseId, token, videoDurations, index]);

  return (
    <div key={chapter.id} className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="font-bold capitalize text-black text-xl mb-2">
        {chapter.chapterTitle}
      </h3>
      <p className="text-gray-800 mb-4 uppercase">
        {chapter.chapterDescription}
      </p>
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <video
          ref={videoRef}
          src={baseUrl + "/" + chapter.courseVideo}
          controls={isEnrolled || chapter.chapterType === "free"}
          className="w-full h-full object-cover rounded-lg shadow-lg"
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => {
            handlePlay(chapter.id);
            startSync();
          }}
        />
      </div>
      <p className="text-gray-600">
        Status:{" "}
        <span className="capitalize text-gray-900">
          {chapter.chapterStatus}
        </span>
      </p>
      <p className="text-gray-600">
        Type:{" "}
        <span className="capitalize text-gray-900">{chapter.chapterType}</span>
      </p>
      <p className="text-gray-600">
        Progress:{" "}
        <span className="capitalize text-gray-900">
          {chProgress >= videoDurations[index]
            ? 100
            : (chProgress / videoDurations[index]).toFixed(2) * 100}
          %
        </span>
      </p>
      {!isEnrolled && chapter.chapterType === "premium" && (
        <p className="text-red-500 font-semibold">
          ** Payment required to access this content **
        </p>
      )}
      {videoDurations[index] && (
        <p className="text-gray-600">
          Duration:{" "}
          <span className="text-gray-900">
            {Math.floor(videoDurations[index] / 60)}m{" "}
            {Math.floor(videoDurations[index] % 60)}s
          </span>
        </p>
      )}
    </div>
  );
};

export default ChapterCard;
