const nodemailer = require("nodemailer");

async function sendEmail(recipientEmail, resetLink) {
  console.log(recipientEmail, "hehe");
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "candace.berge13@ethereal.email",
      pass: "5Y5YPV3G3x1thu9Z2x",
    },
  });

  // Email options
  let mailOptions = {
    from: "jansujerry12@gmail.com", // Sender address
    to: recipientEmail, // List of recipients
    subject: "Password Reset Link", // Subject line
    text: "Here is your password reset link: " + resetLink, // Plain text body
    html:
      '<p>Here is your password reset link: <a href="' +
      resetLink +
      '">Reset Password</a></p>', // HTML body content
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
