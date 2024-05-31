// authMiddleware.js
import jwt from "jsonwebtoken";
import { User, Organization } from "../models/models.js";

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

    // Buscar si el usuario perteneze en el staff o director de alguna organizacion
    const organization = await Organization.findOne({
      $or: [{ director: user._id }, { staff: user._id }],
    });

    if (organization) {
      req.organization = organization;
    }

    // Adjuntar el perfil del usuario a la solicitud
    req.user = user;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
