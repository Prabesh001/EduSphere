const {
  getAllCourseChapters,
} = require("../controllers/admin/chapterController");
const {
  getAllCourses,
  getCourseById,
  enrollment,
  getEnrolledCourses,
  addComment,
  getAllComments,
} = require("../controllers/admin/courseController");
const {
  getProfile,
  updateUserAndProfile,
  addPayment,
  getEnrollments,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const multer = require("multer");

const router = require("express").Router();
var requestp = require("request-promise");
const { payment } = require("../model");

var KHALTI_VERIFY = "https://khalti.com/api/v2/payment/verify/";
// var secret_key = process.env.KHALTI_SECRET_KEY;
var SECRET_KEY = "test_secret_key_0e92d34825544efa8073e9ba124528c5";

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
// normal user
router.route("/courses").get(getAllCourses);
router.route("/courses/:id").get(getCourseById);
router.route("/course-chapters/:id").get(getAllCourseChapters);
router.route("/enroll/:id").get(isAuthenticated, enrollment);
router.route("/enrolled-course").get(isAuthenticated, getEnrolledCourses);
router.route("/profile").get(isAuthenticated, getProfile);
router
  .route("/update-profile")
  .patch(imageUpload.single("photoUrl"), isAuthenticated, updateUserAndProfile);

router.route("/add-comment/:id").post(isAuthenticated, addComment);
router.route("/get-comment/:id").get(isAuthenticated, getAllComments);

router.post("/payment/:id", isAuthenticated, addPayment);
router.get("/getId/:courseId", isAuthenticated, getEnrollments);


module.exports = router;
