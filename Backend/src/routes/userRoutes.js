import { Router } from "express";
import User from "../models/userModel.js";
import generateJWT from "../utils/generateJWT.js";
import generateID from "../utils/generateID.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// Ruta para registrar un nuevo usuario
router.post("/signin", async (req, res) => {
  const { username, email, password } = req.body;
  const existeEmail = await User.findOne({ email });
  if (existeEmail) {
    return res.status(400).json({ error: "This email is already registered" });
  }

  try {
    const user = new User(req.body);
    user.token = generateJWT(user._id);
    await user.save();

    res.status(201).json({ message: "User registered succesfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el usuario", error });
  }
});

// Ruta para iniciar sesión
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "This user don't exist" });
    }
    if (await user.comprobarPassword(password)) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: user.token,
      });
    } else {
      res.status(403).json({ message: "Wrong password." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

// Ruta para obtener el perfil de un usuario con el token
router.get("/profile", authMiddleware, async (req, res) => {
  res.json(req.user);
});


export default router;
