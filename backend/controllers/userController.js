// Import your User and Profile models

const { profile, users, payment, enroll, courses } = require("../model");

// Define your controller function
exports.getProfile = async (req, res) => {
  try {
    // Assuming you receive the user ID from the request
    const userId = req.userId;

    // Retrieve the profile along with associated user details
    const profileDetails = await profile.findOne({
      where: { userId: userId },
      include: [{ model: users }],
    });
    console.log(profileDetails, "profile");

    if (!profileDetails) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Send the profile details with associated user details in the response
    res.status(200).json(profileDetails);
  } catch (error) {
    console.error("Error retrieving profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUserAndProfile = async (req, res) => {
  const userId = req.userId;
  const { firstName, lastName } = req.body;

  try {
    // Find the user by userId
    const user = await users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user data
    user.firstName = firstName;
    user.lastName = lastName;

    await user.save();

    // Find the associated profile by userId
    const userProfile = await profile.findOne({ where: { userId } });
    if (!userProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Update profile data only if photoUrl is provided
    if (req.file && req.file.path) {
      const photoUrl = req.file.path;
      userProfile.photoUrl = photoUrl;
      await userProfile.save();
    }

    // Respond with success message
    res.status(200).json({ message: "User and profile updated successfully" });
  } catch (error) {
    console.error("Error updating user and profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addPayment = async (req, res) => {
  try {
    // Check if the enroll exists
    const order = await enroll.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!order) {
      return res.status(404).json({
        status: 404,
        message: "Enrollment not found",
      });
    }

    // Create payment if enroll exists
    const payments = await payment.create({
      userId: req.userId,
      amount: 1000,
      enrollId: req.params.id,
    });

    // Update the enrollment payment status
    await order.update({
      paymentStatus: true,
    });

    // Return successful response
    res.json({
      status: 200,
      message: "Payment successfully added",
      data: payments,
    });
  } catch (error) {
    // Error handling
    console.error("Error adding payment:", error);
    res.status(500).json({
      status: 500,
      message: "Failed to add payment",
    });
  }
};

exports.getEnrollments = async (req, res) => {
  const userId = req.userId;
  const { courseId } = req.params;
  console.log(courseId)

  try {
    const enrollments = await enroll.findAll({
      where: {
        userId: userId,
        courseId: courseId,
      },
    });
    console.log(enrollments, "sda")

    if (enrollments.length > 0) {
      res.json({
        status: 200,
        message: "Enrollments retrieved successfully",
        data: enrollments,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "No enrollments found",
      });
    }
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    res.status(500).json({
      status: 500,
      message: "Failed to retrieve enrollments",
    });
  }
};
