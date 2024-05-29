import { Router } from "express";
import {
  createRoutine,
  getRoutines,
  getRoutineById,
  updateRoutine,
  deleteRoutine,
} from "../controllers/singleRoutineController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// Ruta para crear una nueva rutina
router.post("/", authMiddleware, createRoutine);

// Ruta para obtener todas las rutinas del usuario
router.get("/", authMiddleware, getRoutines);

// Ruta para obtener una rutina por ID
router.get("/:id", authMiddleware, getRoutineById);

// Ruta para actualizar una rutina por ID
router.put("/:id", authMiddleware, updateRoutine);

// Ruta para eliminar una rutina por ID
router.delete("/:id", authMiddleware, deleteRoutine);

export default router;
