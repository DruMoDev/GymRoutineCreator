import "../src/config/dotenv.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/connectDB.js";
import userRoutes from "./routes/userRoutes.js";
import singleRoutineRoutes from "./routes/singleRoutineRoutes.js";
import groupRoutineRoutes from "./routes/groupRoutineRoutes.js";
import generateJWT from "./utils/generateJWT.js";
import corsOptions from "./config/cors.js";

// Express app instance
const app = express();
app.use(express.json());

// Connect to DB
connectDB();

// CORS
app.use(cors(corsOptions));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/routines/single", singleRoutineRoutes);
app.use("/api/routines/group", groupRoutineRoutes);

// Database connection
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
