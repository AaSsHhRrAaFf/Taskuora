
# Taskuora - MERN Task Management Application

## Overview

Taskuora is a comprehensive task management web application built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to create, manage, and track tasks efficiently. This application adheres to the design provided in Figma: [Figma design](https://www.figma.com/design/5iMEaU0uMrI5AWsAxHfkba/fives_m32220_FO2186F5A8386--Copy-?node-id=17945-20444&m=dev).

## Features

-   User Authentication: Secure user registration, login, and logout functionality.
-   Task Management: Create, read, update, and delete tasks.
-   Task Organization: Tasks can be filtered by category and status.
-   Responsive UI: User-friendly interface that is responsive across different screen sizes.
-   Spin Wheel: A fun way to randomly select a task.

## Technologies Used

-   **Frontend:**
    -   React: A JavaScript library for building user interfaces.
    -   React Router DOM: For routing and navigation.
    -   Tailwind CSS: A utility-first CSS framework for styling the application.
    -   Lucide React: For icons.
    -   Axios: For making HTTP requests to the backend.
    -   Context API: For managing global state.
    -   Vite: Build tool.

-   **Backend:**
    -   Node.js: JavaScript runtime environment.
    -   Express.js: A web application framework for Node.js.
    -   MongoDB: A NoSQL database.
    -   Mongoose: An ODM (Object-Document Mapper) for MongoDB.
    -   JSON Web Tokens (JWT): For authentication.
    -   Bcrypt: For password hashing.
    -   Cors: Middleware to handle Cross-Origin Resource Sharing.
    -   Helmet: Middleware to secure HTTP headers.
    -   Express Validator: Middleware for input validation.
    -   dotenv: For managing environment variables.

## Project Structure

```
taskuora/          # Root directory
├── frontend/       # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/          # Authentication components
│   │   │   ├── home/          # Home components
│   │   │   ├── pages/         # Page components
│   │   │   ├── modals/        # Reusable Modal components
│   │   ├── context/         # Authentication context
│   │   ├── services/        # API services
│   │   ├── assets/          # Static assets (images, etc.)
│   │   ├── App.jsx          # Main App component
│   │   ├── main.jsx         # Entry point for React
│   │   └── index.css        # Global styles
│   ├── public/          # Public assets
│   ├── package.json     # Frontend dependencies
│   ├── vite.config.js   # Vite configuration
│   └── ...
├── backend/        # Node.js/Express backend
│   ├── src/
│   │   ├── models/         # Mongoose models
│   │   ├── controllers/    # Route handlers
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Custom middleware
│   │   ├── config/         # Database configuration
│   │   ├── utils/          # Utility functions
│   │   ├── app.js           # Express app configuration
│   │   └── index.js         # Entry point for backend
│   ├── package.json     # Backend dependencies
│   └── ...
├── README.md        # Project documentation
└── ...
```

## Setup Instructions

### Prerequisites

-   Node.js (>=18.0)
-   npm (>=8.0) or yarn
-   MongoDB installed and running or MongoDB Atlas account

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd taskuora
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Configure backend environment variables:**

    -   Create a `.env` file in the `backend` directory.
    -   Add the following environment variables:

        ```
        PORT=5000
        MONGO_URI=<your-mongodb-connection-string>
        JWT_SECRET=<your-jwt-secret>
        ```

4.  **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

### Running the Application

1.  **Start the backend server:**

    ```bash
    cd backend
    npm run dev
    ```

    The backend server will start on port 5000 (or the port specified in your `.env` file).

2.  **Start the frontend development server:**

    ```bash
    cd ../frontend
    npm run dev
    ```

    The frontend application will be available at `http://localhost:5173`.

## API Endpoints

The backend provides the following API endpoints:

-   `POST /api/users/register`: Register a new user.
-   `POST /api/users/login`: Login user.
-   `GET /api/users/me`: Get current user's data (requires authentication).
-   `POST /api/tasks`: Create a new task (requires authentication).
-   `GET /api/tasks`: Get all tasks for the authenticated user (requires authentication).
-   `GET /api/tasks/:id`: Get a specific task by ID (requires authentication).
-   `PUT /api/tasks/:id`: Update a task (requires authentication).
-   `DELETE /api/tasks/:id`: Delete a task (requires authentication).


## Additional Notes

-   The application follows a clean architecture with well-separated frontend and backend components.
-   Error handling is implemented throughout the application.
-   The UI is designed to be responsive and user-friendly.

---

Thank you for reviewing Taskuora!
```
