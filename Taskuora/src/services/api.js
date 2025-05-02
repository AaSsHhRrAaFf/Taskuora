
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    //console.log("Token from localStorage:", token); // Debugging localStorage
    if (token) {
      config.headers["x-auth-token"] = token;
      //console.log("Adding token to header:", token); // Debugging header
    } else {
      console.log("No token found in localStorage"); // Debug if no token
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error); // Log any errors in interceptor
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., token expired)
      console.warn("Authentication error:", error.response.data);
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users/register", userData);
    return response.data;
  } catch (error) {
    console.error(
      "Register error:",
      error.response ? error.response.data : error.message
    ); // Debugging register error
    throw error.response.data;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/users/login", credentials);
    return response.data;
  } catch (error) {
    console.error(
      "Login error:",
      error.response ? error.response.data : error.message
    ); // Debugging login error
    throw error.response.data;
  }
};

export const getMe = async () => {
  try {
    //console.log("Attempting to get user data..."); // Debug before getMe request
    const response = await api.get("/users/me");
    //console.log("getMe response:", response.data); // Debug response data
    return response.data;
  } catch (error) {
    console.error(
      "getMe error:",
      error.response ? error.response.data : error.message
    ); // Debugging getMe error
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    /* console.log("Creating task with data:", taskData);
    console.log("Current headers:", api.defaults.headers);
    console.log("Auth token from localStorage:", localStorage.getItem("token")); */

    const response = await api.post("/tasks", taskData);
    //console.log("Task creation successful, response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    console.error(
      "Error details:",
      error.response
        ? {
            status: error.response.status,
            statusText: error.response.statusText,
            data: error.response.data,
            headers: error.response.headers,
          }
        : "No response details available"
    );

    // Check if it's an auth-related error
    if (error.response && error.response.status === 401) {
      console.error("Authentication error. Token might be invalid or expired.");
    }

    throw error.response ? error.response.data : error.message;
  }
};

/* export const deleteTask = async (id) => {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting task:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}; */

export const deleteTask = async (id) => {
  try {
    //console.log("Attempting to delete task with ID:", id); // Debug: Log the task ID
    //console.log("Current headers:", api.defaults.headers); // Debug: current headers
    const response = await api.delete(`/tasks/${id}`);
    //console.log("Delete task successful, response:", response.data); // Debug: Successful response
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    console.error(
      "Error details:",
      error.response
        ? {
            status: error.response.status,
            statusText: error.response.statusText,
            data: error.response.data,
            headers: error.response.headers,
          }
        : "No response details available"
    );
    throw error;
  }
};

export default api;
