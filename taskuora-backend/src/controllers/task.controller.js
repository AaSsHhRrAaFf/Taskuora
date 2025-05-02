
const Task = require("../models/task.model");

const createTask = async (req, res) => {
  try {
    const userId = req.user;
    const { title, description, dueDate, priority, status, category } = req.body;

    // Validate the request body
    if (!title) {
      return res.status(400).json({ msg: "Title is required" });
    }

    // Create a new task 
    const newTask = new Task({
      user: userId,
      title,
      description,
      dueDate,
      priority,
      status,
      category
    });

    // Save the task to the database
    const task = await newTask.save();

    // Respond with the newly created task
    res.status(201).json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createTask,
};
