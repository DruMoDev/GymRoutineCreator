import "../src/config/dotenv.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/connectDB.js";
import userRoutes from "./routes/userRoutes.js";
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

// Database connection
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
