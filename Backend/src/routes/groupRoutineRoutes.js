import { Router } from "express";
import {
  createGroupRoutine,
  getGroupRoutines,
  getGroupRoutineById,
  updateGroupRoutine,
  deleteGroupRoutine,
} from "../controllers/groupRoutineController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// Ruta para crear una nueva rutina grupal
router.post("/", authMiddleware, createGroupRoutine);

// Ruta para obtener todas las rutinas grupales del usuario
router.get("/", authMiddleware, getGroupRoutines);

// Ruta para obtener una rutina grupal por ID
router.get("/:id", authMiddleware, getGroupRoutineById);

// Ruta para actualizar una rutina grupal por ID
router.put("/:id", authMiddleware, updateGroupRoutine);

// Ruta para eliminar una rutina grupal por ID
router.delete("/:id", authMiddleware, deleteGroupRoutine);

export default router;
