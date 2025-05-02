
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const taskController = require("../controllers/task.controller");
const Task = require("../models/task.model");

// GET all tasks for a user
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET task by ID
router.get("/:id", auth, async (req, res) => {
  console.log("Fetching task with ID:", req.params.id);
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.status(500).send("Server Error");
  }
});

// POST create a task
router.post("/", auth, taskController.createTask);

// PUT update a task
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Check user authorization
    if (task.user.toString() !== req.user) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Update the task
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.priority = req.body.priority || task.priority;
    task.status = req.body.status || task.status;
    task.category = req.body.category || task.category;

    await task.save();

    res.json({ msg: "Task updated" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.status(500).send("Server Error");
  }
});

// DELETE a task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      console.log("Task not found with ID:", req.params.id);
      return res.status(404).json({ msg: "Task not found" });
    }

    // Check user authorization
    if (task.user.toString() !== req.user) {
      console.log("User not authorized to delete task");
      return res.status(401).json({ msg: "User not authorized" });
    }

    await Task.findByIdAndDelete(req.params.id); 

    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error("Server error:", err.message);
    if (err.kind === "ObjectId") {
      console.log("Invalid task ID format:", req.params.id);
      return res.status(404).json({ msg: "Task not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
