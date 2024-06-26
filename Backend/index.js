// import "./config/dotenv.js";
import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import userRoutes from "./routes/userRoutes.js";
import organizationRoutes from "./routes/organizationRoutes.js";
import dotenv from "dotenv";

// Express app instance
const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "production.env" });
} else {
  dotenv.config({ path: "development.env" });
}

// Connect to DB
connectDB();

// CORS
// app.use(cors(corsOptions));
app.use(
  cors({
    origin: [
      "https://gym-routine-creator.vercel.app",
      "https://gym-routine-creator.vercel.app/",
      "https://gym-routine-creator-drus-projects.vercel.app",
      "https://gym-routine-creator-git-main-drus-projects.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Routes
app.use("/api/user", userRoutes);
app.use("/api/organization", organizationRoutes);

// Database connection
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
