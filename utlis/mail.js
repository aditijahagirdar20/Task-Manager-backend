const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "aditideveloperrj@gmail.com",
    pass: "rlnvqxtxfchstqtq",
  },
});

// Function to send email notification
const sendCompletionEmail = (email, task) => {
  const mailOptions = {
    from: "aditideveloperrj@gmail.com",
    to: email,
    subject: "Task Completed",
    text: `Dear user, your task "${task}" has been completed. Great job!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendCompletionEmail;
