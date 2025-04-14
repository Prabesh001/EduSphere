const { users, profile } = require("../model");
const bcrypt = require("bcrypt");
const generateToken = require("../services/generateToken");
const sendEmail = require("./mail");
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if the user already exists
    const userFound = await users.findOne({ where: { email } });
    if (userFound) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create the user
    const newUser = await users.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 8),
    });

    // Create a profile for the user
    await profile.create({
      userId: newUser.id, // Associate the profile with the newly created user
    });

    // Respond with success message
    res.status(200).json({ message: "Registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const userEmailFound = await users.findAll({
    where: {
      email,
    },
  });
  if (userEmailFound.length > 0) {
    const isMatched = bcrypt.compareSync(password, userEmailFound[0].password);
    if (isMatched) {
      const token = generateToken(userEmailFound[0]);
      res.status(200).json({
        message: "Logged in sucsess",
        token,
        data: userEmailFound[0],
      });
    } else {
      res.status(400).json({
        message: "invalid password",
      });
    }
  } else {
    res.status(400).json({
      message: "Noone registered with this email",
    });
  }
};

exports.request = async (req, res) => {
  const userEmail = req.body.email;
  const resetLink = `http://localhost:5173/password-reset?email=${userEmail}`;
  console.log(userEmail);

  // Send the reset email
  try {
    await sendEmail(userEmail, resetLink);
    res.json({
      status: 200,
      message: "Password reset email sent.",
    });
  } catch (error) {
    res.status(500).send("Error sending email: " + error.message);
  }
};

exports.resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Using findOne to retrieve a single user
    const user = await users.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).send("User not found");
    }

    // Hashing the new password
    const saltRounds = 10; // You can adjust the cost factor based on your security requirements and server capacity
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Updating the user's password with the hashed password
    user.password = hashedPassword;

    // Saving the updated user back to the database
    await user.save();

    res.json({ status: 200, message: "Password has been successfully reset" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).send("Failed to reset password");
  }
};
