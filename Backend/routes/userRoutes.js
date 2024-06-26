import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  deleteUser,
  getProfile,
  loginUser,
  registerUser,
  registerUserClient,
  updateUserClient,
  deleteUserClient,
  deleteClientRoutine,
  updateUser,
  createClientRoutine,
} from "../controllers/userController.js";

const router = Router();

// Ruta para registrar un nuevo usuario
router.post("/signin", registerUser);

// Ruta para iniciar sesión
router.post("/login", loginUser);

// Ruta para obtener el perfil de un usuario con el token
router.get("/profile", authMiddleware, getProfile);

// Ruta para eliminar un usuario
router.delete("/delete", authMiddleware, deleteUser);

// Ruta para actualizar un usuario
router.put("/update", authMiddleware, updateUser);

// Ruta para registrar un cliente nuevo en el usuario
router.post("/clients", authMiddleware, registerUserClient);

// Ruta para actualizar un cliente
router.put("/clients/:clientId", authMiddleware, updateUserClient);

// Ruta para eliminar un cliente
router.delete("/clients/:clientId", authMiddleware, deleteUserClient);

//Ruta para crear una rutina a un cliente por ID
router.post("/clients/:clientId/routines", authMiddleware, createClientRoutine);

// Ruta para eliminar una rutina de un cliente por ID
router.delete(
  "/clients/:clientId/routines/:routineId",
  authMiddleware,
  deleteClientRoutine
);

export default router;
