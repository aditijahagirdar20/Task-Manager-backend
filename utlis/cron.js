const nodemailer = require("nodemailer");
const Todo = require("../models/todo"); // Assuming your Todo model is in ../models/todo

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

const log = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(logMessage);
};

// Function to send email notifications for due tasks
const sendDueDateEmails = async () => {
  try {
    const now = new Date();
    const todos = await Todo.find({
      dueDate: { $lte: now },
      completed: false,
    });

    for (const todo of todos) {
      const mailOptions = {
        from: "your-email@gmail.com",
        to: todo.userEmail,
        subject: "Task Due Reminder",
        text: `Dear user, your task "${todo.text}" is due.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          log(`Error sending email for task "${todo.text}": ${error.message}`);
        } else {
          log(`Email sent for task "${todo.text}": ${info.response}`);
        }
      });
    }
  } catch (error) {
    log(`Error in sendDueDateEmails: ${error.message}`);
  }
};

module.exports = sendDueDateEmails;

// Call this function manually for testing
// testSendDueDateEmails();
