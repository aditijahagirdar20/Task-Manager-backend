// models/Todo.js

const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userEmail: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date, // Add a new field for due date
  },
});

module.exports = mongoose.model("Todo", todoSchema);
