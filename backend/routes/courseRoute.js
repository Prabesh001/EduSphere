const {
  getAllCourseChapters,
} = require("../controllers/admin/chapterController");
const {
  addCourse,
  addCourseChapter,
  addCourseCategory,
  getCourseById,
  getAllCourses,
  deleteCourse,
  updateCourse,
  getAdminAllCourses,
  getTeacherCourses,
  addComment,
} = require("../controllers/admin/courseController");
const { getDashboardData } = require("../controllers/admin/teacherController");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const restrictTo = require("../middleware/restrictTo");
const multer = require("multer");

const router = require("express").Router();

// Multer setup for image uploads
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const imageFileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
  fileFilter: imageFileFilter,
});

// Multer setup for video uploads
const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/videos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const videoFileFilter = (req, file, cb) => {
  if (
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/mpeg" ||
    file.mimetype === "video/quicktime"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const videoUpload = multer({
  storage: videoStorage,
  limits: {
    fileSize: 1024 * 1024 * 100, // 100MB
  },
  fileFilter: videoFileFilter,
});
// admin
router
  .route("/add-course")
  .post(
    imageUpload.single("courseImage"),
    isAuthenticated,
    restrictTo("teacher"),
    addCourse
  );
router
  .route("/update-course/:id")
  .patch(
    imageUpload.single("courseImage"),
    isAuthenticated,
    restrictTo("admin"),
    updateCourse
  );
router
  .route("/get-course/:id")
  .get(isAuthenticated, restrictTo("teacher"), getCourseById);
router.route("/get-course").get(isAuthenticated, getTeacherCourses);

router
  .route("/get-admin-course")
  .get(isAuthenticated, restrictTo("admin"), getAdminAllCourses);
router
  .route("/delete-course/:id")
  .delete(isAuthenticated, restrictTo("teacher"), deleteCourse);

router
  .route("/delete-admin-course/:id")
  .delete(isAuthenticated, restrictTo("admin"), deleteCourse);
router
  .route("/add-chapter/:id")
  .post(
    videoUpload.single("courseVideo"),
    isAuthenticated,
    restrictTo("teacher"),
    addCourseChapter
  );
router
  .route("/get-course-chapters/:id")
  .get(isAuthenticated, restrictTo("teacher"), getAllCourseChapters);

// normal user
router.route("/courses").get(getAllCourses);

router
  .route("/get-dashboard")
  .get(isAuthenticated, restrictTo("teacher"), getDashboardData);

module.exports = router;
