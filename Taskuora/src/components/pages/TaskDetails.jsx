

import React, { useState, useEffect } from "react";
import { Calendar, ChevronDown, Pencil, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { deleteTask } from "../../services/api";
import SuccessModal from "../modals/SuccessModal";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import success from "../../assets/successfull.svg";
import deletePic from "../../assets/delete.svg";

const TaskDetails = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("inprogress");
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await api.get(`/tasks/${id}`);
        setTask(response.data);
        setStatus(
          response.data.status === "in-progress"
            ? "inprogress"
            : response.data.status
        );
      } catch (error) {
        console.error("Error fetching task details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [id]);

  const onBack = () => {
    navigate("/");
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const onEdit = () => {
    navigate(`/edit-task/${id}`);
  };

  const onDelete = () => {
    setShowDeleteConfirmationModal(true);
  };

  const confirmDeleteTask = async () => {
    setShowDeleteConfirmationModal(false);
    try {
      await deleteTask(id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task.");
    }
  };

  const cancelDeleteTask = () => {
    setShowDeleteConfirmationModal(false);
  };

  const handleSubmit = async () => {
    try {
      const updatedTask = {
        ...task,
        status: status === "inprogress" ? "in-progress" : status,
      };
      await api.put(`/tasks/${id}`, updatedTask);
      setTask(updatedTask);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to submit task.");
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Task not found
      </div>
    );
  }

  const getStatusColor = (currentStatus) => {
    switch (currentStatus) {
      case "inprogress":
      case "in-progress":
        return "bg-amber-500";
      case "completed":
      case "done":
        return "bg-emerald-500";
      case "pending":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (currentStatus) => {
    switch (currentStatus) {
      case "inprogress":
      case "in-progress":
        return "InProgress";
      case "completed":
      case "done":
        return "Completed";
      case "pending":
        return "Pending";
      default:
        return currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Task Details</h1>
        <div className="flex gap-3">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 bg-amber-50 text-amber-500 px-4 py-2 rounded-lg hover:bg-amber-100 transition-colors"
          >
            <Pencil size={18} />
            <span className="font-medium">Edit Task</span>
          </button>
          <button
            onClick={onBack}
            className="bg-emerald-400 text-white px-8 py-2 rounded-lg hover:bg-emerald-500 transition-colors font-medium"
          >
            Back
          </button>
        </div>
      </div>

      {/* Task Content */}
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6Z"
                fill="#047857"
              />
              <path
                d="M20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM13 14H15V11H18V9H15V6H13V9H10V11H13V14Z"
                fill="#047857"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{task.title}</h2>
            <p className="text-gray-500 mt-2 max-w-3xl leading-relaxed">
              {task.description}
            </p>
          </div>
        </div>
      </div>

      {/* Task Details */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-medium mb-2 text-gray-700">End Date</h3>
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-gray-500" />
            <span className="text-gray-700">Friday, April 19 - 2024</span>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-2 text-transparent">Status</h3>
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full ${getStatusColor(status)} mr-2`}
            ></div>
            <span
              className={`font-medium text-${getStatusColor(status).replace(
                "bg-",
                ""
              )}`}
            >
              {getStatusText(status)}
            </span>
          </div>
        </div>
      </div>

      {/* Status Change */}
      <div className="mb-12">
        <label
          htmlFor="status"
          className="block font-medium mb-2 text-gray-700"
        >
          Change Status
        </label>
        <div className="relative">
          <select
            id="status"
            value={status}
            onChange={handleStatusChange}
            className="w-full border border-gray-300 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-200 text-gray-700"
          >
            <option value="pending">Pending</option>
            <option value="inprogress">InProgress</option>
            <option value="completed">Completed</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <ChevronDown size={20} className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onDelete}
          className="bg-red-100 text-red-500 px-8 py-3 rounded-lg hover:bg-red-200 transition-colors font-medium"
        >
          Delete Task
        </button>
        <button
          onClick={handleSubmit}
          className="bg-emerald-400 text-white px-8 py-3 rounded-lg hover:bg-emerald-500 transition-colors font-medium"
        >
          Submit
        </button>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal onClose={closeSuccessModal} imageSrc={success} />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmationModal && (
        <DeleteConfirmationModal
          onConfirm={confirmDeleteTask}
          onCancel={cancelDeleteTask}
          imageSrc={deletePic}
        />
      )}
    </div>
  );
};

export default TaskDetails;
