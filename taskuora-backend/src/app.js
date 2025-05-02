
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const userRoutes = require("./routes/user.routes");
const taskRoutes = require("./routes/task.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
  };

// Middleware
app.use(express.json());
//app.use(cors());
app.use(cors(corsOptions));
app.use(helmet());



  
 
  
// Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
