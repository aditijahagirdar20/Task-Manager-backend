const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todos");
const authRoutes = require("./routes/auth");
const cron = require("node-cron");
const sendDueDateEmails = require("./utlis/cron");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

// MongoDB Connection
const mongoURI =
  "mongodb+srv://aditiraghuraj:viToRgKLLhnRTquq@cluster0.rqc1h7a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
// Cron job to send due date reminder emails every day at 8 AM

const log = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;

  console.log(logMessage);
};

cron.schedule("0 8 * * *", () => {
  log("Running due date email scheduler...");
  sendDueDateEmails();
});

// Function to manually trigger email sending (for testing purposes)
const testSendDueDateEmails = async () => {
  log("Manually triggering due date email sending...");
  await sendDueDateEmails();
};

// Call this function manually for testing
testSendDueDateEmails();
