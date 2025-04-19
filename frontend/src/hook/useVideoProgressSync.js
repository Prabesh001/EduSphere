import axios from "axios";
import { baseUrl } from "../config";
import { toast } from "react-toastify";

let isSyncing = false;

export const syncProgress = async ({ videoRef, chapterId, courseId }) => {
  const token = localStorage.getItem("token");
  if (!videoRef?.current || isSyncing) return;

  const currentTime = videoRef.current.currentTime;

  try {
    isSyncing = true;
    const response = await axios.post(
      `${baseUrl}/progress/course`,
      {
        course_id: courseId,
        chapter_id: chapterId,
        progress: currentTime,
      },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Sync error:", error);
    toast.error("Failed to sync progress");
  } finally {
    isSyncing = false;
  }
};
