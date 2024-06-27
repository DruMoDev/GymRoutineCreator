import express from "express";
import connectDB from "./config/connectDB.js";
import "./config/dotenv.js";
// import corsOptions from "./config/cors.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import organizationRoutes from "./routes/organizationRoutes.js";

// Express app instance
const app = express();
app.use(express.json());

// Connect to DB
connectDB();

// CORS
// app.use(cors(corsOptions));
const whitelist = [
  "https://gym-routine-creator-dru.vercel.app",
  "https://gym-routine-creator-backend.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200, // Para navegadores antiguos
};

app.use(cors(corsOptions));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/organization", organizationRoutes);

// Database connection
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
