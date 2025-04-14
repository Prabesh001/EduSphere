const { where } = require("sequelize");
const { users, courses, enroll, Sequelize } = require("../../model");
const bcrypt = require("bcrypt");

exports.registerTeacher = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  console.log(req.body);
  const [userFound] = await users.findAll({
    where: {
      email,
    },
  });
  console.log(userFound);
  if (userFound) {
    return res.status(400).json({
      message: "User already exist",
    });
  }
  await users.create({
    firstName,
    lastName,
    email,
    password: bcrypt.hashSync("password", 8),
    role: "teacher",
  });

  res.status(200).json({
    message: "Registered successfully",
  });
};

// Delete a teacher
exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the teacher exists
    const user = await users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Delete the teacher
    await user.destroy();

    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error("Error deleting teacher:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a teacher
exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    // Check if the teacher exists
    let user = await users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Update the teacher
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    await user.save();

    res.status(200).json({ message: "Teacher updated successfully" });
  } catch (error) {
    console.error("Error updating teacher:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const allTeachers = await users.findAll({ where: { role: "teacher" } });
    res.status(200).json(allTeachers);
  } catch (error) {
    console.error("Error getting all teachers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getDashboardData = async (req, res) => {
  try {
    // Get enrollment count for each course
    const coursesWithEnrollmentCount = await courses.findAll({
      where: {
        userId: req.userId,
      },
      include: [
        {
          model: enroll,
        },
      ],
    });
    console.log(coursesWithEnrollmentCount, "Enrollment count");

    // Get total course count
    const totalCourseCount = await coursesWithEnrollmentCount.length;

    res.status(200).json({
      coursesWithEnrollmentCount,
      totalCourseCount,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
