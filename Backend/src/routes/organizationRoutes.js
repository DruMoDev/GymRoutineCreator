import express from "express";
import {
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} from "../controllers/organizationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Ruta para obtener una organización por su ID
router.get("/", authMiddleware, getOrganization);

// Ruta para crear una nueva organización
router.post("/", authMiddleware, createOrganization);

// Ruta para actualizar una organización existente
router.put("/:id", authMiddleware, updateOrganization);

// Ruta para eliminar una organización
router.delete("/:id", authMiddleware, deleteOrganization);

export default router;
