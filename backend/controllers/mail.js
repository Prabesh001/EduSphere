const nodemailer = require("nodemailer");

const email = process.env.USER_EMAIL;
const password = process.env.USER_PASSWORD;

async function sendEmail(recipientEmail, resetLink) {
  console.log(recipientEmail, "hehe");
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    pool: true,
    maxConnections: 20,
    auth: {
      user: email,
      pass: password,
    },
  });

  // Email options
  let mailOptions = {
    from: email, // Sender address
    to: recipientEmail, // List of recipients
    subject: "Password Reset Link", // Subject line
    text: "Here is your password reset link: " + resetLink, // Plain text body
    html:
      '<p>Here is your password reset link: <a href="' +
      resetLink +
      '" target="_blank">Reset Password</a></p>', // HTML body content
  };

  // Send email
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Rethrow the error for caller to handle
  }
}

module.exports = sendEmail;
