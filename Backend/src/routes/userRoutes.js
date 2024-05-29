import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getProfile, loginUser, registerUser } from "../controllers/userController.js";

const router = Router();

// Ruta para registrar un nuevo usuario
router.post("/signin", registerUser);

// Ruta para iniciar sesión
router.post("/login", loginUser);

// Ruta para obtener el perfil de un usuario con el token
router.get("/profile", authMiddleware, getProfile);

export default router;
