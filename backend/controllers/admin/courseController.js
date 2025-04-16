const { where } = require("sequelize");
const {
  categories,
  chapters,
  courses,
  enroll,
  users,
  review,
  profile,
} = require("../../model");
const jwt = require("jsonwebtoken");

exports.addCourseCategory = async (req, res) => {
  const { categoryName } = req.body;
  await categories.create({
    categoryName,
  });
  res.status(200).json({
    message: "Category added successfully",
  });
};
exports.updateCourseCategory = async (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;

  try {
    const category = await categories.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.categoryName = categoryName;
    await category.save();

    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteCourseCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await categories.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy();

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllCourseCategories = async (req, res) => {
  try {
    const category = await categories.findAll();
    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addCourseChapter = async (req, res) => {
  const { id: courseId } = req.params;
  const { chapterTitle, chapterDescription, chapterStatus, chapterType } =
    req.body;
  const courseVideo = req.file.path;

  await chapters.create({
    chapterStatus,
    chapterTitle,
    chapterType,
    chapterDescription,
    courseId,
    courseVideo,
  });
  res.status(200).json({
    message: "Chapter created successfully",
  });
};

exports.addCourse = async (req, res) => {
  const { courseName, courseDescription, coursePrice, courseCategoryId } =
    req.body;
  const userId = req.userId;
  const courseImage = req.file.path;

  await courses.create({
    courseName,
    coursePrice,
    courseImage,
    courseDescription,
    courseCategoryId,
    userId,
    isVerified: false,
  });

  res.status(200).json({
    message: "Course added successfully",
  });
};

exports.addComment = async (req, res) => {
  const { comment, rating } = req.body;
  const courseId = req.params.id;
  const userId = req.userId;

  await review.create({
    comment,
    rating,
    courseId,
    userId,
    isVerified: false,
  });

  res.status(200).json({
    message: "comment added successfully",
  });
};

exports.getAllComments = async (req, res) => {
  try {
    const coursesData = await review.findAll({
      where: { courseId: req.params.id },
      include: [
        {
          model: users,
          include: [
            {
              model: profile,
            },
          ],
        },
      ],
    });
    res.status(200).json(coursesData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllCourses = async (req, res) => {
  try {
    const coursesData = await courses.findAll({
      where: { isVerified: true },
      include: [
        {
          model: categories,
        },
      ],
    });
    res.status(200).json(coursesData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTeacherCourses = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is obtained from the request
    const coursesData = await courses.findAll({ where: { userId: userId } });
    res.status(200).json(coursesData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAdminAllCourses = async (req, res) => {
  try {
    const coursesData = await courses.findAll();
    res.status(200).json(coursesData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single course by id
exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await courses.findByPk(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseName, courseDescription, coursePrice, courseCategoryId } =
      req.body;
    const courseImage = req.file.path;

    const updatedCourse = await courses.update(
      {
        courseName,
        courseDescription,
        coursePrice,
        courseCategoryId,
        courseImage,
      },
      { where: { id } }
    );
    if (!updatedCourse[0]) {
      return res.status(404).json({ message: "courses not found" });
    }
    res.status(200).json({ message: "Course updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCourseVerification = async (req, res) => {
  try {
    const { id } = req.params;
    const { isVerified } = req.body;

    // Add isVerified to the update object
    const updatedCourse = await courses.update(
      {
        isVerified: isVerified, // Set isVerified to true
      },
      { where: { id } }
    );

    if (!updatedCourse[0]) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourseCount = await courses.destroy({ where: { id } });
    if (deletedCourseCount === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.enrollment = async (req, res) => {
  try {
    // Extract enrollment data from the request body
    const { id } = req.params;

    // Check if the user is authenticated
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Authorization token is missing" });
    }

    // Verify the token to get the user's email (assuming the token contains an 'id' that is the user's email)
    const decryptedToken = jwt.verify(token, "haha");
    const userEmail = decryptedToken.id;


    // Check if the user is already enrolled in the specific course
    const existingEnrollment = await enroll.findOne({
      where: {
        userId: userEmail,
        courseId: id,
      },
    });

    if (existingEnrollment) {
      return res
        .status(400)
        .json({ message: "User is already enrolled in the course" });
    }

    // Create a new enrollment instance
    const enrollment = new enroll({
      userId: userEmail,
      courseId: id,
      enrollDate: Date.now(),
    });

    // Save the enrollment to the database
    await enrollment.save();

    // Fetch user details from the database
    const userDetails = await users.findOne({ where: { id: userEmail } });

    // Send a success response with enrollment and user details
    res.status(201).json({
      message: "Enrollment successful",
      enrollment,
      user: userDetails,
    });
  } catch (error) {
    // Handle errors
    console.error("Error enrolling user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    // Extract user ID from the request
    const id = req.userId;

    // Find the user in the database
    const user = await users.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find all enrollments associated with the user
    const enrollments = await enroll.findAll({
      where: { userId: user.id },
      include: [{ model: courses }],
    });

    // If the user has no enrollments, return an empty array
    if (!enrollments || enrollments.length === 0) {
      return res
        .status(200)
        .json({ message: "User has no enrolled courses", enrollments: [] });
    }

    // If enrollments are found, return them in the response
    res.status(200).json({ enrollments });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCourseEnrollmentsForUser = async (req, res) => {
  try {
    // Extract user ID and course ID from the request parameters or query
    let userId = req.userId;
    const { courseId } = req.params; // or use req.query if passed as query parameters

    // Verify that the course exists and belongs to the user
    const course = await courses.findOne({
      where: {
        id: courseId,
        userId: userId, // Assuming each course has an associated userId field
      },
    });

    if (!course) {
      return res
        .status(404)
        .json({ error: "Course not found or does not belong to the user" });
    }

    // Find all enrollments for the specified course
    const enrollments = await enroll.findAll({
      where: { courseId: course.id },
      include: [
        {
          model: users,
        },
        {
          model: courses,
        },
      ],
    });

    // Respond with the enrollments
    if (enrollments.length === 0) {
      return res.status(200).json({
        message: "No enrollments found for this course",
        enrollments: [],
      });
    }

    res.status(200).json({ enrollments });
  } catch (error) {
    console.error("Error fetching course enrollments for user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
