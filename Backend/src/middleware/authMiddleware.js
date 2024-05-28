// authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
  // Obtener el token del encabezado de autorización
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar al usuario por el ID codificado en el token
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //Quita la contraseña de la respuesta del usuario para protegerla de ser expuesta en la respuesta
    user.password = undefined;

    // Adjuntar el perfil del usuario a la solicitud
    req.user = user;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
