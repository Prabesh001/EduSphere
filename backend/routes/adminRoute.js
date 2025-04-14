const {
  addCourseCategory,
  deleteCourseCategory,
  updateCourseCategory,
  getAllCourseCategories,
  getAdminAllCourses,
  updateCourseVerification,
  getCourseEnrollmentsForUser,
} = require("../controllers/admin/courseController");
const {
  registerTeacher,
  deleteTeacher,
  updateTeacher,
  getAllTeachers,
} = require("../controllers/admin/teacherController");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const restrictTo = require("../middleware/restrictTo");

const router = require("express").Router();

router
  .route("/add-teacher")
  .post(isAuthenticated, restrictTo("admin"), registerTeacher);
router
  .route("/delete-teacher/:id")
  .delete(isAuthenticated, restrictTo("admin"), deleteTeacher);
router
  .route("/update-teacher/:id")
  .patch(isAuthenticated, restrictTo("admin"), updateTeacher);
router
  .route("/get-all-teacher")
  .get(isAuthenticated, restrictTo("admin"), getAllTeachers);
router
  .route("/add-category")
  .post(isAuthenticated, restrictTo("admin"), addCourseCategory);
router
  .route("/delete-category/:id")
  .delete(isAuthenticated, restrictTo("admin"), deleteCourseCategory);
router
  .route("/update-category/:id")
  .patch(isAuthenticated, restrictTo("admin"), updateCourseCategory);
router.route("/get-all-category").get(getAllCourseCategories);
router
  .route("/get-admin-course")
  .get(isAuthenticated, restrictTo("admin"), getAdminAllCourses);

router
  .route("/is-verified/:id")
  .patch(isAuthenticated, restrictTo("admin"), updateCourseVerification);

router
  .route("/course-enroll/:courseId")
  .get(isAuthenticated, restrictTo("teacher"), getCourseEnrollmentsForUser);

module.exports = router;
