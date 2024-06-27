import express from "express";
import connectDB from "./config/connectDB.js";
import "./config/dotenv.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import organizationRoutes from "./routes/organizationRoutes.js";

// Express app instance
const app = express();
app.use(express.json());

// Connect to DB
connectDB();

// CORS
const whitelist = [
  "https://gym-routine-creator-dru.vercel.app",
  "https://gym-routine-creator-backend.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log(`Origin: ${origin}`); // Verificar origen
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Manejar las solicitudes OPTIONS

// Middleware de registro
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/organization", organizationRoutes);

// Database connection
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
