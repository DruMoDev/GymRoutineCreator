import User from "../models/userModel.js";
import generateJWT from "../utils/generateJWT.js";

// Controlador para registrar un nuevo usuario
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const existeEmail = await User.findOne({ email });
  if (existeEmail) {
    return res.status(400).json({ error: "This email is already registered" });
  }

  try {
    const user = new User(req.body);
    user.token = generateJWT(user._id);
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Controlador para iniciar sesión
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "This user doesn't exist" });
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
    res.status(500).json({ message: "Error logging in" });
  }
};

// Controlador para obtener el perfil de un usuario con el token
export const getProfile = async (req, res) => {
  res.json(req.user);
};
