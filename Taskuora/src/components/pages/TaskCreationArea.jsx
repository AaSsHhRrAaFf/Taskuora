
import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import TaskModal from "./TaskModal";
import { deleteTask, createTask } from "../../services/api";
import notask from "../../assets/notask.png";
import api from "../../services/api";
import { Link } from "react-router-dom"; 

// Function to generate a unique ID
const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 15);
};

const TaskCreationArea = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        console.log("Fetched tasks:", response.data);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTaskClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateTask = async (newTask) => {
    try {
      // Generate unique ID on the frontend
      const taskId = generateUniqueId();
      ///console.log("Generated unique ID:", taskId);

      // Add the id to the new task object
      const newTaskWithId = { ...newTask, id: taskId };

      //console.log("Task to be created:", newTaskWithId);

      const createdTask = await createTask(newTaskWithId);
      c//onsole.log("Task creation successful, response:", createdTask);

      // Update the state with the new task, using the _id from the response
      setTasks([...tasks, { ...createdTask, id: createdTask._id }]);
      handleCloseModal();
    } catch (apiError) {
      console.error("Error creating task:", apiError);
      alert(apiError.message || "Failed to create task. Please try again.");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      console.log("Deleting task with ID:", id);
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task.");
    }
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    const categoryMatch =
      categoryFilter === "all" || task.category === categoryFilter;
    const statusMatch = statusFilter === "all" || task.status === statusFilter;
    return categoryMatch && statusMatch;
  });

  const categories = [
    "Art and Craft",
    "Nature",
    "Family",
    "Sport",
    "Friends",
    "Meditation",
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm px-6 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h3 className="text-xl font-bold">All Task List</h3>

        <div className="flex flex-col md:flex-row items-stretch gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <select
              className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-md py-2.5 px-4 pr-8 text-gray-700"
              value={categoryFilter}
              onChange={handleCategoryFilterChange}
            >
              <option value="all">Select Task Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          <div className="relative w-full md:w-48">
            <select
              className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-md py-2.5 px-4 pr-8 text-gray-700"
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              <option value="all">All Task</option>
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          <button
            className="bg-emerald-400 hover:bg-emerald-500 text-white font-medium py-2.5 px-4 rounded-md flex items-center justify-center space-x-2 min-w-[180px]"
            onClick={handleAddTaskClick}
          >
            <Plus size={18} />
            <span>Add New Task</span>
          </button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <img src={notask} alt="No Tasks" className="w-64 h-auto mb-4" />
          <p className="text-gray-500">
            No tasks are available yet, please add a task.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              status={task.status}
              task={task}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreate={handleCreateTask}
      />
    </div>
  );
};

const TaskCard = ({ task, status, onDelete }) => {
  return (
    <Link
      to={`/tasks/${task._id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex space-x-3">
            <div className="bg-emerald-100 h-10 w-10 rounded-full flex items-center justify-center">
              <span className="text-emerald-700 font-bold text-xs">
                {task.category
                  ? task.category.substring(0, 2).toUpperCase()
                  : "TC"}
              </span>
            </div>
            <div>
              <h4 className="font-bold text-gray-800">{task.title}</h4>
              <p className="text-sm text-gray-500 mt-1">
                {task.description ||
                  "Select the role that you want to candidates for and upload your job description."}
              </p>
            </div>
          </div>
          <button
            className="text-red-400 hover:text-red-500"
            onClick={() => {
              console.log("Delete button clicked for task ID:", task.id);
              onDelete(task._id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-1 text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm">Friday, April 19 - 2024</span>
          </div>

          <div
            className={`
          ${status === "pending" ? "text-purple-500" : ""}
          ${status === "inprogress" ? "text-amber-500" : ""}
          ${status === "done" ? "text-emerald-500" : ""}
          flex items-center
        `}
          >
            <span className="mr-1 text-lg">•</span>
            <span className="text-sm">
              {status === "pending"
                ? "Pending"
                : status === "inprogress"
                ? "In Progress"
                : "Done"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TaskCreationArea;
