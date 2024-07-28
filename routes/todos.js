// routes/todos.js

const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const sendCompletionEmail = require("../utlis/mail");
// Get all todos for a specific user
router.get("/:userEmail", async (req, res) => {
  try {
    const todos = await Todo.find({ userEmail: req.params.userEmail });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new todo for a specific user
router.post("/", async (req, res) => {
  const { text, completed, userEmail, dueDate } = req.body;
  const todo = new Todo({
    text,
    completed,
    userEmail,
    dueDate, // Include dueDate in the creation request
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Update a todo for a specific user
router.patch("/:userEmail/:id", getTodo, async (req, res) => {
  if (req.body.text != null) {
    res.todo.text = req.body.text;
  }
  if (req.body.completed != null) {
    res.todo.completed = req.body.completed;
    if (req.body.completed) {
      sendCompletionEmail(req.params.userEmail, res.todo.text);
    }
  }
  try {
    const updatedTodo = await res.todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a todo for a specific user
router.delete("/:userEmail/:id", getTodo, async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get todo by ID
async function getTodo(req, res, next) {
  let todo;
  try {
    todo = await Todo.findById(req.params.id);
    if (todo == null || todo.userEmail !== req.params.userEmail) {
      return res.status(404).json({ message: "Todo not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.todo = todo;
  next();
}

module.exports = router;
